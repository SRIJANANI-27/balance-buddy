import React from 'react';

function Labels({ data }) {

 

  return (
    <div>
      {data.map((v, i) => (
        <LabelComp key={i} data={v} />
      ))}
    </div>
  );
}

function LabelComp({ data }) {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between mt-3">
      <div className="flex gap-2 ">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? '#f9c74f' }}
        ></div>
        <h3 className="text-md font-semibold text-shadow-md">{data.type ?? ''}</h3>
      </div>
      <h3 className="font-bold">₹ {data.percent ?? 0}</h3>
    </div>
  );
}

export default Labels;
