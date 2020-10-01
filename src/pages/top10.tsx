import { GetStaticProps } from 'next';

interface IProduct {
  id: number;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function top10({ products }: Top10Props) {
  return (
    <div>
      <h1>Top 10</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 5,
  };
  // gerando site estatico com chamada a api de forma que isso não afeta na performance
  // revalidade é para a cada 5 segundos essa pagina revalidar ou refazer a chamada a api, tendo mais desempenho
};
