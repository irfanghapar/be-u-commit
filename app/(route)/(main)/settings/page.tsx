import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function settings () {
  return (
    <div>
      Settings
      <Button className="rounded-full">Change Password</Button>
      <span>Please type here</span>
      <Input></Input>
    </div>
  )
}