import { getList } from "@/libs/microcms";

export default async function Home() {
  const { contents } = await getList();

  return (
    <div>
      <h1 className="h-[75px] w-full border-b-2 border-gray border-soild">オタ活めも</h1>
      <ul className="flex gap-2 m-10">
      {contents.map((post) => {
        return (
        <li key={post.id} className="border-b-2 border-gray border-soild">
          <div>ライブ名: {post.live.name}</div>
          <div>日程: {post.live.date}</div>
          <div>会場名: {post.location.name}</div>
          <div>座席: {post.seat}</div>
        </li>
        );
      })}
      </ul>
    </div>
  );
}