
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HallucinationReport {
  id: string;
  user_id: string;
  feature: string;
  report_text: string;
  reported_at: string;
  reviewed: boolean;
  review_notes: string | null;
}

export const useHallucinationReports = () => {
  const [reports, setReports] = useState<HallucinationReport[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_hallucination_reports')
        .select('*')
        .order('reported_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
    } catch (error) {
      console.error('Error fetching hallucination reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hallucination reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReport = async (
    userId: string,
    feature: string,
    reportText: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_hallucination_reports')
        .insert({
          user_id: userId,
          feature: feature,
          report_text: reportText
        });

      if (error) throw error;

      console.log('Hallucination report submitted successfully');
      
      // Refresh reports
      fetchReports();
    } catch (error) {
      console.error('Error submitting hallucination report:', error);
      toast({
        title: "Error",
        description: "Failed to submit hallucination report",
        variant: "destructive",
      });
    }
  };

  const updateReview = async (
    reportId: string,
    reviewed: boolean,
    reviewNotes?: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_hallucination_reports')
        .update({
          reviewed: reviewed,
          review_notes: reviewNotes || null
        })
        .eq('id', reportId);

      if (error) throw error;

      console.log('Review status updated successfully');
      
      // Refresh reports
      fetchReports();
    } catch (error) {
      console.error('Error updating review status:', error);
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive",
      });
    }
  };

  const getUnreviewedReports = (): HallucinationReport[] => {
    return reports.filter(report => !report.reviewed);
  };

  const getReviewedReports = (): HallucinationReport[] => {
    return reports.filter(report => report.reviewed);
  };

  const getReportsByFeature = (feature: string): HallucinationReport[] => {
    return reports.filter(report => report.feature === feature);
  };

  return {
    reports,
    loading,
    fetchReports,
    submitReport,
    updateReview,
    getUnreviewedReports,
    getReviewedReports,
    getReportsByFeature,
  };
};
