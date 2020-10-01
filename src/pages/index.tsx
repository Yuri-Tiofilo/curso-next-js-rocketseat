import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

import SE0 from '@/components/SEO';

interface IProduct {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // const [recommendedProdutcs, setRecomendedProducts] = useState<IProduct[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then((response) => {
  //     response.json().then((data) => {
  //       setRecomendedProducts(data);
  //     });
  //   });
  // }, []); Client Side // forma feita para caso os motores de busca não precisem acessar essa informação

  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;
    alert(sum(3, 5));
  }

  return (
    <div>
      <SE0
        title="Dev commerce your beautful e-commerce"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendProduct) => (
            <li key={recommendProduct.id}>{recommendProduct.title}</li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={() => {
          handleSum();
        }}
      >
        Somar
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  );
  const recommendedProducts = await response.json();

  return {
    props: { recommendedProducts },
  };

  // server side -> informação totalmente dinamica buscada por meio do servidor node
  // aonde os motores de busca consegue realizar seu serviço de indexação
};
