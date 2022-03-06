import { Button, Text, Box } from "@chakra-ui/react";
import { product } from "@prisma/client";
import Link from "next/link";

export interface ProductPreviewCartProps {
  data: product;
  amount: number;
  onClick: () => void;
  onDecreaseAmount: () => void;
  onAddAmount: () => void;
  onRemove: () => void;
}

export default function ProductPreviewCart({
  data,
  amount,
  onClick,
  onDecreaseAmount,
  onAddAmount,
  onRemove,
}: ProductPreviewCartProps) {
  return (
    <Box
      key={data.id}
      d="flex"
      justifyContent="center"
      aligndatas="center"
      gap="2"
      w="full"
    >
      <Link href={`/product/${data.id}`}>
        <a onClick={onClick} style={{ width: "100%" }}>
          <Box d="flex" shadow="sm" borderWidth="1px" borderRadius="lg" p="3">
            <Text flex="3" fontWeight="semibold">
              {data.name}
            </Text>
            <Text flex="1" d="grid" placeContent="center">
              ${data.price}
            </Text>
          </Box>
        </a>
      </Link>
      <Box flex="1" d="grid" placeContent="center">
        <Box d="flex">
          <Button onClick={onDecreaseAmount}>-</Button>
          <Text d="grid" placeContent="center">
            {amount}
          </Text>
          <Button onClick={onAddAmount}>+</Button>
        </Box>
      </Box>

      <Button onClick={onRemove}>X</Button>
    </Box>
  );
}
