'use client';

import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import {
  FaAngleLeft,
  FaCoins,
  FaPaw,
  FaPiggyBank,
  FaPills,
  FaPlaneDeparture,
  FaScroll,
  FaSearch,
  FaStethoscope,
  FaTaxi,
  FaUmbrellaBeach
} from 'react-icons/fa';
import {
  FaArrowTurnDown,
  FaArrowTurnUp,
  FaCartShopping,
  FaGasPump,
  FaRegNoteSticky,
  FaSquarePen
} from 'react-icons/fa6';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';

import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import SwitchCategories from 'components/SwitchCategories';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './management.css';

import { bgStyleType } from 'util/constant';
import { convertCurrency } from 'util/format';
import { createMovement, handleIconMoviment } from 'util/function';
import { IInfo, TType } from 'util/interface';

import { useFormik } from 'formik';
import { AppContext } from 'lib/ProviderApp';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as yup from 'yup';

const monthList = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

const typesOfExpenses = [
  { icon: <FaUmbrellaBeach size={24} />, label: 'Ferias', type: 'vacancy' },
  { icon: <FaScroll size={24} />, label: 'Contas', type: 'bill' },
  { icon: <FaPiggyBank size={24} />, label: 'Guardar', type: 'reserve' },
  { icon: <FaPlaneDeparture size={24} />, label: 'Viagens', type: 'travel' },
  { icon: <FaStethoscope size={24} />, label: 'Médico', type: 'medical service' },
  { icon: <FaTaxi size={24} />, label: 'Uber/Táxi', type: 'car service' },
  { icon: <FaGasPump size={24} />, label: 'Gasolina/GNV', type: 'fuel' },
  { icon: <FaCartShopping size={24} />, label: 'Compras/Mercado', type: 'mart' },
  { icon: <FaPaw size={24} />, label: 'PetShop', type: 'petshop' },
  { icon: <FaPills size={24} />, label: 'Farmácia', type: 'pharmacy' },
  { icon: <FaRegNoteSticky size={24} />, label: 'Outros', type: 'other' },
  {
    icon: (
      <div className="flex items-center gap-1">
        <FaCoins size={24} />
        <FaArrowTurnDown size={24} />
      </div>
    ),
    label: 'Depósito',
    type: 'deposit'
  },
  {
    icon: (
      <div className="flex items-center gap-1">
        <FaCoins size={24} />
        <FaArrowTurnUp size={24} />
      </div>
    ),
    label: 'Transferência',
    type: 'transfer'
  }
];

const initialValues = {
  label: '',
  description: '',
  type: '',
  value: ''
};

const date = new Date();
const monthAtual = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);

export default function Management() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [selectFilter, setSelectFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { data, handlerUser } = useContext(AppContext);

  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: yup.object({
      label: yup.string().required('Campo obrigatório'),
      type: yup.string().required('Escolha uma categoria que melhor se encaixa'),
      value: yup
        .string()
        .test('testValue', 'Valor inválido ou maior que o saldo atual', (value) => {
          if (value) {
            const convertValue = Number(value.replace(/[^0-9]+/g, ''));
            if (convertValue <= 0) return false;
            if (data?.user.balance && convertValue > data.user.balance) return false;
            return true;
          }
          return true;
        })
    }),
    onSubmit: async (values, formik) => {
      try {
        setLoading(true);
        handlerUser(createMovement(values, data as IInfo));
        formik.resetForm({ values: initialValues });
        toast.success(`${values.label} adicionado as suas despesas!`);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  });

  const toggleModal = () => setOpen(!isOpen);
  const toogleModalFilter = () => setIsOpenFilter(!isOpenFilter);

  const handleSelectFilter = (field: string, value: string) => {
    setSelectFilter(value);
    toogleModalFilter();
  };

  return (
    <>
      {loading ? <Spinner /> : null}
      <section className="grid grid-cols-3 gap-3 pb-10">
        <div className="card col-span-3 !block md:!flex p-5 items-center">
          <button
            className="mr-5 bg-emerald-500 rounded-full p-3 text-white mb-4 md:mb-0"
            onClick={() => router.push('/')}
          >
            <FaAngleLeft />
          </button>
          <h4 className="text-gray-600 text-xl md:flex justify-between w-full">
            <span className="block">
              Gestão do
              <strong className="text-emerald-800 font-bold pl-2">
                {data?.user.name || <Skeleton width={100} />}
              </strong>
            </span>
            <span className="block text-gray-400 text-xl font-extrabold">
              Saldo atual
              <strong className="text-emerald-800 text-2xl ml-2">
                {data?.user.balance ? (
                  convertCurrency(data?.user.balance)
                ) : data?.user.balance === 0 ? (
                  'R$ 0,00'
                ) : (
                  <Skeleton width={100} />
                )}
              </strong>
            </span>
          </h4>
        </div>
        <div className="card col-span-3 flex-col">
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row">
            <Button type="button" onClick={toggleModal} className="col-span-3 rounded-none">
              <FaSquarePen size={32} /> Anotar gasto
            </Button>
            <Button className="w-fit rounded-none" onClick={toogleModalFilter}>
              {selectFilter ? (
                <>
                  {typesOfExpenses
                    .filter((select) => select.type === selectFilter)
                    .map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        {item.icon} {item.label}
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <FaSearch />
                  Filtrar
                </>
              )}
            </Button>
          </div>
          <Swiper
            initialSlide={monthList.findIndex((m) => m === monthAtual)}
            pagination={{
              type: 'progressbar'
            }}
            modules={[Pagination]}
            className="min-h-[300px]"
          >
            {monthList.map((item, index) => (
              <SwiperSlide key={index} className="">
                <div className="w-full mx-auto shadow pt-5 h-full">
                  <div className="py-2 text-lg text-emerald-600 font-semibold uppercase">
                    {item}
                  </div>
                  <div className="text-start h-full">
                    <div className="w-full overflow-y-scroll h-full max-h-[200px]">
                      {data?.history.filter((h) => h.month === item).length ? (
                        (selectFilter !== ''
                          ? data.history.filter((f) => f.type === selectFilter) ?? [
                              { label: 'Sem movimentações' }
                            ]
                          : data.history
                        )?.map((h, index) => (
                          <div
                            key={index}
                            className={`px-3 py-2 flex items-center gap-3 ${
                              bgStyleType[h.type as TType]
                            }`}
                          >
                            <div>{handleIconMoviment(h.type)}</div>
                            <div>
                              <div>{h.label}</div>
                              <div className="font-bold">{convertCurrency(h.value)}</div>
                              <div className="text-sm">
                                {h.date} - {h.time}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="w-full h-full flex justify-center items-center">
                          Sem movimentações
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h4 className="text-xl border-b-2 pb-2 mb-2 md:flex">
          Anote seus gastos,
          <strong className="text-emerald-800 md:ml-1 flex items-center gap-2">
            não se preocupe tentando lembrar de tudo (:
          </strong>
        </h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 pr-2 max-h-[480px] overflow-y-scroll"
        >
          <Input
            label="Titulo"
            name="label"
            value={values.label}
            placeholder="No que esta gastando?"
            onChange={handleChange}
            error={errors.label}
            touched={touched.label}
          />
          <Input
            label="Descrição"
            name="description"
            value={values.description}
            placeholder="Para lembrar...."
            onChange={handleChange}
            error={errors.description}
            touched={touched.description}
          />
          <Input
            label="Valor"
            name="value"
            value={values.value}
            placeholder="R$ 0,00"
            onChange={(ev) => setFieldValue('value', convertCurrency(ev.target.value))}
            error={errors.value}
            touched={touched.value}
          />
          <SwitchCategories
            label="Escolha uma categoria :)"
            className="mt-4"
            categories={typesOfExpenses}
            checked={values.type}
            error={errors.type}
            touched={touched.type}
            setFieldValue={setFieldValue}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal>
      <Modal isOpen={isOpenFilter} onClose={toogleModalFilter}>
        <SwitchCategories
          label="Filtrar por categorias"
          categories={typesOfExpenses}
          checked={selectFilter}
          setFieldValue={handleSelectFilter}
        />
        <Button type="button" onClick={() => handleSelectFilter('', '')} className="mt-5">
          Limpar filtro
        </Button>
      </Modal>
    </>
  );
}
