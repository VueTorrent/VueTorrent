<script setup lang="ts">
import { formatDataUnit, formatDataValue } from '@/helpers'
import { Torrent } from '@/types/vuetorrent'
import { FlexRender, getCoreRowModel, useVueTable, createColumnHelper, ColumnDef } from '@tanstack/vue-table'

const props = defineProps<{ data: Array<Torrent> }>()

const columnHelper = createColumnHelper<Torrent>()

const columns: ColumnDef<Torrent, any>[] = [
  columnHelper.accessor(row => row.name, {
    id: 'name',
    cell: info => info.getValue(),
    header: () => 'Name'
  }),
  columnHelper.accessor(row => row.size, {
    id: 'size',
    cell: info => `${formatDataValue(info.getValue(), true)} ${formatDataUnit(info.getValue(), true)}`,
    header: () => 'Size'
  }),
  columnHelper.accessor(row => row.progress, {
    id: 'progress',
    cell: info => info.getValue(),
    header: () => 'Progress'
  })
]

const table = useVueTable({
  get data() {
    return props.data
  },
  columns,
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <!-- we don't have nested or grouped headers, so we use the getFlatHeaders function to loop over our headers -->
        <th v-for="header in table.getFlatHeaders()" :key="header.id">
          <!-- FlexRender is a generic component to render headers, cells, footers -->  
          <FlexRender
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
