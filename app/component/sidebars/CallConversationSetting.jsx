import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const NodeSettingsSidebar = () => {
  return (
    <Card className="w-[320px] h-full p-4 border-l shadow-none rounded-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-800">
          Node Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">

        <div className="flex items-center justify-between">
          <Label htmlFor="skip-response">Skip Response</Label>
          <Switch id="skip-response" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="global-node">Global Node</Label>
          <Switch id="global-node" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="block-interrupt">Block Interruptions</Label>
          <Switch id="block-interrupt" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="llm-select">LLM</Label>
          <Switch id="llm-select" />
        </div>

        <div className="space-y-2 pt-2">
          <Label className="text-sm font-medium">Fine-tuning Examples</Label>
          <Button variant="outline" size="sm">
            + Add
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}

export default NodeSettingsSidebar
