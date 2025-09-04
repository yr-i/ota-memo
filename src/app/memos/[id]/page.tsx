import { getDetail } from "@/lib/microcms";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Music, Castle, Armchair, Binoculars } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/format-date"
import DOMPurify from "isomorphic-dompurify"

interface MemoDetailPageProps {
  params: {
    id: string
  }
}

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { id } = await params;
  const content = await getDetail(id);

  if (!content) {
    // メモが見つからない場合は404ページを表示
    notFound()
  }

  // HTMLコンテンツをサニタイズ
  const sanitizedContent = DOMPurify.sanitize(content.content)

  return (
    // TODO: 必須・任意項目の考慮
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">一覧に戻る</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">メモ詳細</h1>
      </header>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{content.live.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Castle className="h-4 w-4" />
                <span>{content.location.name}</span>
              </div>
              {content.seat && (
                <div className="flex items-center gap-1">
                  <Armchair className="h-4 w-4" />
                  <span>{content.seat}</span>
                </div>
              )}
              {content.view && (
                <div className="flex items-center gap-1">
                  <Binoculars className="h-4 w-4" />
                  <span>{content.view}</span>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="html-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="live-info" className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-primary" />
                    <span className="font-semibold">ライブ情報</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">ライブ名</h4>
                      <p className="text-foreground">{content.live.name}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">セットリスト</h4>
                      <p className="whitespace-pre-wrap text-foreground">{content.live.setList}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">作成日</h4>
                        <p className="text-foreground">{formatDate(content.live.createdAt)}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">更新日</h4>
                        <p className="text-foreground">{formatDate(content.live.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        {content.location && (
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="live-info" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Castle className="h-5 w-5 text-primary" />
                      <span className="font-semibold">会場情報</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">会場名</h4>
                        <p className="text-foreground">{content.location.name}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">キャパ</h4>
                          <p className="whitespace-pre-wrap text-foreground">{content.location.capacity}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground mb-1">アクセス</h4>
                          <p className="text-foreground">{content.location.access}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">メモ</h4>
                        <p className="text-foreground">{content.location.memo}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
