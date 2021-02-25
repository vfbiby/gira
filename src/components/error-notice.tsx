export const ErrorNotice = ({ error }: { error: Error | null }) => {
  return (
    <div className="flex items-center justify-center pt-6 text-4xl text-pink-700 uppercase">
      {error?.message}
    </div>
  );
};
