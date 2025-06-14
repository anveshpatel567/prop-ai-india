
import React from "react";
type ErrorBoxProps = { message: string };
export function ErrorBox({ message }: ErrorBoxProps): JSX.Element {
  return <div className="bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded mb-2 text-sm">{message}</div>;
}
