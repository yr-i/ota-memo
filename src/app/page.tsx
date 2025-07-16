import { getList } from "@/lib/microcms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { formatDate } from "@/lib/format-date";

export default async function Home() {
  const { contents } = await getList();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">オタ活めも</h1>
        <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="メモを検索..." className="pl-9 w-full sm:w-[200px] lg:w-[300px] bg-white" disabled />
        </div>
        <Button className="w-full sm:w-auto" disabled>
          <Plus className="mr-2 h-4 w-4" />
          新規作成
        </Button>
      </header>

      <main className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {contents.map((content) => (
          <Card key={content.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{content.live.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{formatDate(content.date)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{content.location.name}</p>
              <p className="text-sm text-muted-foreground">{content.seat}</p>
            </CardContent>
          </Card>
        ))}
      </main>

      {contents.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          <p>まだメモがありません。新しいメモを作成しましょう！</p>
        </div>
      )}
    </div>
  )
}