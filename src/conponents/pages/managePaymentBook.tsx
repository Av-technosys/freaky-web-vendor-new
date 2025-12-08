import { Card, CardDescription } from "../../components/ui";
import DeleteServiceDialog from "../deleteServiceDialog";
import EditPaymentBookDialog from "../editPaymentBookDialog";

const priceBookLists = [
  {
    title: "Standard",
  },
  {
    title: "Diwali sale",
    productsData: [
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "flat",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: null,
            upperSlab: null,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "tire",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 10,
            upperSlab: 100,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 101,
            upperSlab: 200,
            listPrice: "900",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
    ],
  },
  {
    title: "New year",
    productsData: [
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "flat",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: null,
            upperSlab: null,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "tire",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 10,
            upperSlab: 100,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 101,
            upperSlab: 200,
            listPrice: "900",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
    ],
  },
  {
    title: "Rakhi special",
    productsData: [
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "flat",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: null,
            upperSlab: null,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "tire",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 10,
            upperSlab: 100,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 101,
            upperSlab: 200,
            listPrice: "900",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
    ],
  },
  {
    title: "Wedding season",
    productsData: [
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "flat",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: null,
            upperSlab: null,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
      {
        productId: 1,
        type: "addon",
        vendorId: 24,
        productTypeId: 8,
        title: "Refined Wooden Mouse",
        description:
          "Ipsam fugit ultio conor patrocinor convoco denuncio delinquo.",
        latitude: "34.968",
        longitude: "116.7647",
        deliveryRadius: 46,
        isAvailable: true,
        currentPriceBook: null,
        pricingType: "tire",
        minQuantity: 49,
        maxQuantity: 465,
        status: false,
        createdAt: "2025-12-01T10:33:32.083Z",
        updatedAt: "2025-12-01T10:33:32.083Z",
        prices: [
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 10,
            upperSlab: 100,
            listPrice: "1000",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
          {
            id: 1,
            productId: 1,
            priceBookingId: 1,
            currency: "USD",
            lowerSlab: 101,
            upperSlab: 200,
            listPrice: "900",
            discountPercentage: "25.15",
            salePrice: "638.31",
            createdAt: "2025-12-01T11:04:53.651Z",
          },
        ],
      },
    ],
  },
];

const ManagePaymentBook = () => {
  return (
    <div className="mt-4">
      {priceBookLists.map((priceBook) => {
        return (
          <Card className="mt-2">
            <CardDescription>
              <div className="w-full px-6 flex items-center justify-between">
                <div className="text-base ">{priceBook.title}</div>
                {priceBook.title != "Standard" && (
                  <div className="flex gap-4">
                    <EditPaymentBookDialog
                      productsData={priceBook.productsData}
                    />
                    <DeleteServiceDialog />
                  </div>
                )}
              </div>
            </CardDescription>
          </Card>
        );
      })}
    </div>
  );
};

export default ManagePaymentBook;
