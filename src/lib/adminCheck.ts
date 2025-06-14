
export function isAdmin(email: string | null): boolean {
  if (!email) return false;
  
  // Add your admin email domains or specific emails here
  const adminDomains = ['@yourcompany.com', '@admin.com'];
  const adminEmails = ['admin@example.com']; // Specific admin emails
  
  return adminDomains.some(domain => email.endsWith(domain)) || 
         adminEmails.includes(email.toLowerCase());
}

export function checkAdminAccess(userEmail: string | null): {
  isAdmin: boolean;
  message: string;
} {
  const adminAccess = isAdmin(userEmail);
  
  return {
    isAdmin: adminAccess,
    message: adminAccess 
      ? 'Admin access granted' 
      : 'Access denied - Admin privileges required'
  };
}
