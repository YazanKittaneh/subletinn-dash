import { LlcPageLayout, LlcHeader } from "./llc-components";
import { llcData } from "./llc-data";

export default function LlcPage() {
  return (
    <LlcPageLayout>
      <LlcHeader title={llcData.title} />
    </LlcPageLayout>
  );
}
