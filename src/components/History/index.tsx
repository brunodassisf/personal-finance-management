import { bgStyleType } from 'util/constant';
import { convertCurrency } from 'util/format';
import { handleIconMoviment } from 'util/function';
import { IHistory } from 'util/interface';

function History({ list }: { list: IHistory[] }) {
  return (
    <article className="card flex flex-col p-5">
      <h4 className="text-lg text-emerald-800 font-bold mb-5">Extrato</h4>
      <div className="max-h-96 overflow-auto">
        {list.length > 0 ? (
          list?.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 py-2 pl-5 border-b ${bgStyleType[item.type]}`}
            >
              <div>{handleIconMoviment(item.type)}</div>
              <div>
                <div className="text-base underline">{item.label}</div>
                <div className="font-bold text-lg">{convertCurrency(item.value)}</div>
                <div className="text-sm text-gray-600">
                  {item.date} - {item.time}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">Sem movimentações no momento</div>
        )}
      </div>
    </article>
  );
}

export default History;
