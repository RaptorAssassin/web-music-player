import { useAppStore } from '@/lib/app-store'

export function Queue() {
  const queue = useAppStore((state) => state.queue)

  return (
    <div className="flex h-full w-full flex-col gap-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure
      veniam consequatur fugit accusantium vero consequuntur deleniti earum
      illo, voluptatibus ipsum aut placeat corrupti possimus repellendus velit,
      quia perferendis omnis.
    </div>
  )
}
