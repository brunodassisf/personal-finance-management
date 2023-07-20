'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import Spinner from 'components/Spinner';

import { convertCurrency } from 'util/format';
import { createMovement } from 'util/function';
import { IInfo } from 'util/interface';

import { useFormik } from 'formik';
import { AppContext } from 'lib/ProviderApp';
import * as yup from 'yup';

const option = [
  {
    label: 'Depósito',
    value: 'deposit'
  },
  {
    label: 'Transferência',
    value: 'transfer'
  }
];

interface IInitialValues {
  moviment: { label: string; value: string } | null;
  value: string;
}

const initialValues: IInitialValues = {
  moviment: null,
  value: ''
};

function Movements() {
  const [loading, setLoading] = useState(false);
  const { data, handlerUser } = useContext(AppContext);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    moviment: yup
      .object({
        label: yup.string().nullable(),
        value: yup.string().nullable()
      })
      .required('Campo obrigatório'),
    value: yup
      .string()
      .test(
        'testValue',
        'Valor inválido ou não é possível tranferir um valor maior que o saldo atual',
        (value, context) => {
          if (value) {
            const convertValue = Number(value.replace(/[^0-9]+/g, ''));
            if (convertValue <= 0) return false;
            if (context.parent.moviment && context.parent.moviment.value === 'transfer') {
              if (data?.user.balance && convertValue <= data.user.balance) return true;
              return false;
            }
            return true;
          }
          return true;
        }
      )
      .required('Campo obrigatório')
  });

  const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formik) => {
      try {
        const moviment = {
          label: values?.moviment?.label || '',
          description: '',
          type: values?.moviment?.value || '',
          value: values?.value
        };

        setLoading(true);
        handlerUser(createMovement(moviment, data as IInfo));
        formik.resetForm({ values: initialValues });
        toast.success(`${values?.moviment?.label || ''} adicionado as suas despesas!`);
        router.refresh();
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <>
      {loading ? <Spinner /> : null}
      <div className="card">
        <div className="grid grid-cols-3 p-5 w-full">
          <form
            onSubmit={handleSubmit}
            className="col-span-3 md:col-span-1 flex flex-col justify-center gap-5"
          >
            <Select
              isClearable
              name="moviment"
              options={option}
              value={values.moviment}
              label="Movimentação"
              placeholder="Selecione uma ação"
              setFieldValue={setFieldValue}
              error={errors.moviment && touched.moviment ? errors.moviment : undefined}
            />
            <Input
              disabled={!values.moviment}
              label="Valor"
              name="value"
              placeholder="R$ 0,00"
              value={values.value}
              onChange={(ev) => setFieldValue('value', convertCurrency(ev.target.value))}
              error={errors.value}
              touched={touched.value}
            />
            <Button type="submit">Adicionar</Button>
          </form>
          <div className="col-span-3 sm:col-span-2 flex justify-end">
            <Image src="/image/wallet.jpg" width={300} height={300} alt="wallet" priority={true} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Movements;
