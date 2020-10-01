import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: number;
  title: string;
}

interface CategoriesProps {
  products: IProduct[];
}

export default function Categories({ products }: CategoriesProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true, // se caso a pagina mudar esse campo vai trazer as novas alterações

    // se houver muitos dados não fazer um query para buscar, recomendado é:
    // deixar paths: [] e fallback: true.
    // pois assim teremos a primeira entrada na pagina carregando e tarzendo coisa nova
  };

  // traz todos os possiveis parametros que serão utilizados na função abaixo para que assim
  // consiga trazer isso de forma dinamica
};

export const getStaticProps: GetStaticProps<CategoriesProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`
  );
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
  // gerando site estatico com chamada a api de forma que isso não afeta na performance
  // revalidade é para a cada 5 segundos essa pagina revalidar ou refazer a chamada a api, tendo mais desempenho
};
