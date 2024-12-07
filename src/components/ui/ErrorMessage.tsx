interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
        {message}
      </div>
    </div>
  );
}