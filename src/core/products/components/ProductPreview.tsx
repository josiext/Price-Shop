import { Box, Badge } from "@chakra-ui/react";
import Image from "next/image";

import { DEFAULT_PROUDUCT_IMAGE } from "utils/images";
import { Product } from "../types";

interface ProductPreviewProps {
  data: Pick<Product, "name" | "images" | "price">;
}

export default function ProductPreview({ data }: ProductPreviewProps) {
  return (
    <Box
      height="350px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      d="flex"
      flexDir="column"
    >
      <Box flex="2" position="relative">
        <Image
          src={data.images[0] || DEFAULT_PROUDUCT_IMAGE}
          alt={data.name}
          objectFit="contain"
          layout="fill"
          priority={true}
        />
      </Box>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.name}
        </Box>

        <Box>{data.price} usd</Box>
      </Box>
    </Box>
  );
}
