"use client"

import { formatCurrency } from "@/helpers/format-currency";
import { formatDate } from "@/helpers/format-date";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { Button, Pagination } from "@heroui/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";

const data = [
    {
        id: '1',
        customerName: 'Tony Reichert',
        phone: '620-888-4357',
        address: 'Rua 123',
        cpf: '000.000.000-00',
        purchasePrice: 1200,
        createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
        id: '2',
        customerName: 'Maria Silva',
        phone: '611-555-0123',
        address: 'Av. Principal 456',
        cpf: '111.222.333-44',
        purchasePrice: 850,
        createdAt: '2023-01-02T10:30:00.000Z',
    },
    {
        id: '3',
        customerName: 'João Santos',
        phone: '622-777-8899',
        address: 'Rua das Flores 789',
        cpf: '222.333.444-55',
        purchasePrice: 2300,
        createdAt: '2023-01-03T15:45:00.000Z',
    },
    {
        id: '4',
        customerName: 'Ana Oliveira',
        phone: '633-444-5566',
        address: 'Alameda dos Anjos 321',
        cpf: '333.444.555-66',
        purchasePrice: 1750,
        createdAt: '2023-01-04T09:15:00.000Z',
    },
    {
        id: '5',
        customerName: 'Carlos Mendes',
        phone: '644-999-0001',
        address: 'Rua do Comércio 654',
        cpf: '444.555.666-77',
        purchasePrice: 3200,
        createdAt: '2023-01-05T14:20:00.000Z',
    },
    {
        id: '6',
        customerName: 'Patricia Lima',
        phone: '655-222-3334',
        address: 'Av. Central 987',
        cpf: '555.666.777-88',
        purchasePrice: 920,
        createdAt: '2023-01-06T11:40:00.000Z',
    },
    {
        id: '7',
        customerName: 'Roberto Alves',
        phone: '666-888-9990',
        address: 'Rua das Palmeiras 147',
        cpf: '666.777.888-99',
        purchasePrice: 1600,
        createdAt: '2023-01-07T16:55:00.000Z',
    },
    {
        id: '8',
        customerName: 'Fernanda Costa',
        phone: '677-333-4445',
        address: 'Av. Beira Mar 258',
        cpf: '777.888.999-00',
        purchasePrice: 2800,
        createdAt: '2023-01-08T13:25:00.000Z',
    },
    {
        id: '9',
        customerName: 'Lucas Pereira',
        phone: '688-777-8881',
        address: 'Rua dos Ipês 369',
        cpf: '888.999.000-11',
        purchasePrice: 1450,
        createdAt: '2023-01-09T08:50:00.000Z',
    },
    {
        id: '10',
        customerName: 'Beatriz Santos',
        phone: '699-111-2223',
        address: 'Alameda das Rosas 741',
        cpf: '999.000.111-22',
        purchasePrice: 1900,
        createdAt: '2023-01-10T17:30:00.000Z',
    }
]

export function CouponsTable() {
    return (
        <Table
            aria-label="Example static collection table"
            className="w-full"
            bottomContent={
                <div className="flex w-full justify-between">
                    <Pagination
                        isCompact
                        showControls
                        page={1}
                        total={10}
                        onChange={(page) => {console.log(page)}}
                    />
                    <Button 
                        variant="light" 
                        color="primary"
                        startContent={<ArrowDownTrayIcon className="size-5" />}
                    >
                        Download
                    </Button>
                </div>
            }
        >
            <TableHeader>
                <TableColumn>NOME</TableColumn>
                <TableColumn>TELEFONE</TableColumn>
                <TableColumn>ENDEREÇO</TableColumn>
                <TableColumn>CPF</TableColumn>
                <TableColumn>VALOR DA COMPRA</TableColumn>
                <TableColumn>DATA DE GERAÇÃO</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Não há cupons gerados">
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.cpf}</TableCell>
                        <TableCell>{formatCurrency(item.purchasePrice)}</TableCell>
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}