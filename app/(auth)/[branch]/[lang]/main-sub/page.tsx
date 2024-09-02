import { Suspense } from "react";

import BulkDataTable from "@/components/ui/tables/BulkDataTable";
import BulkDataTableSkeleton from "@/components/ui/tables/BulkDataTableSkeleton";

export default async function MainSub() {
  const name = "main";
  const subName = "sub";
  const url = `/admin/catalog/${name}/bulk/${subName}`;
  return (
    <Suspense fallback={<BulkDataTableSkeleton />}>
      <BulkDataTable name={name} url={url} />
    </Suspense>
  );
}
