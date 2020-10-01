import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddToCartModal = dynamic(() => import('@/components/AddToCartmodal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Products() {
  const router = useRouter();

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState<
    boolean
  >(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button
        type="button"
        onClick={() => {
          handleAddToCart();
        }}
      >
        Add to Cart
      </button>
      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
