export default function Footer() {
  return (
    <div className="flex justify-center items-center h-16 bg-gray-200">
      <p className="text-gray-600 font-medium">
        <span className="font-bold">Crypto Tracker</span>
        &copy; {new Date().getFullYear()} Crypto Tracker. All rights reserved.
      </p>
    </div>
  );
}
