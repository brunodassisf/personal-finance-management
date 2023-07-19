'use client';
import Image from 'next/image';
import { useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import Spinner from 'components/Spinner';

import { convertCurrency } from 'util/format';
import { handleToast } from 'util/function';

import { useFormik } from 'formik';
import { useSWRConfig } from 'swr';
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

const initialValues = {
  moviment: null,
  value: ''
};

function Movements({ balance }: { balance?: number }) {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

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
            if (context.parent.moviment.value === 'transfer') {
              if (balance && convertValue <= balance) return true;
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
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/moviment`, {
        method: 'POST',
        body: JSON.stringify(values)
      });
      const { msg } = await response.json();
      if (response.status === 200) {
        formik.resetForm({ values: initialValues });
        mutate('/api/user');
      }
      handleToast(response.status, msg);
      setLoading(false);
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
