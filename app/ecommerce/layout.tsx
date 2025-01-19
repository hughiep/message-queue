export default function EcommerceLayout({
  children,
  status,
}: {
  children: React.ReactNode
  status: React.ReactNode
}) {
  return (
    <div>
      {children}
      {status}
    </div>
  )
}
