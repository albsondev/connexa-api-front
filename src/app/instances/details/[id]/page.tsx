import DetailsInstance from '@/components/Form/DetailsInstance';
import InstanceExpired from '@/components/Form/InstanceExpired';
import { getDictionary } from '@/locales/dictionary'

const InstanceDetails = async ({ params }: { params: { id: string } }) => {
  const dict = await getDictionary()
  const { id } = params;

  if (id === '3D90B63983DA20F309FBCE82F470C0C7') {
    return (
      <div>
        <DetailsInstance status='trial' id={id} dict={dict} />
      </div>
    );
  }

  if (id === 'expired') {
    return (
      <div>
        <InstanceExpired status='expired' id={id} dict={dict} />
      </div>
    );
  } 

  if (id === 'trial') {
    return (
      <div>
        <DetailsInstance status='expired' id={id} dict={dict} />
      </div>
    );
  }

  return (
    <div>
      <InstanceExpired status='trial' id={id} dict={dict} />
    </div>
  );
};

export default InstanceDetails;
