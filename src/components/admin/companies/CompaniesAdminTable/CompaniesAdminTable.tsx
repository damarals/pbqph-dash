'use client'

import { api } from '@/trpc/react'
import { ColumnDef } from '@tanstack/react-table'

import DataTable from '@/components/shared/DataTable'
import { getColumns } from './CompaniesAdminTable.constants'
import { DataTableToolbar } from './CompaniesAdminToolbar'

export default function CompaniesAdminTable() {
  const [companies, { refetch }] = api.company.getAll.useSuspenseQuery()
  const columns = getColumns({ refetchCompanies: refetch })

  if (!companies) return null
  return (
    <DataTable
      data={companies}
      columns={
        columns as ColumnDef<(typeof companies)[number], typeof columns>[]
      }
      toolbar={DataTableToolbar}
      subject="construtoras"
      refetchFn={refetch}
    />
  )
}