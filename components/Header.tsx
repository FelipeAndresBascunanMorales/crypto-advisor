import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center items-center h-16 bg-gray-200 p-4 ">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Crypto Tracker</h1>
        </Link>
      </div>
    </div>
  );
}
