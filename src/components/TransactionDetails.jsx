<div className="grid grid-cols-1 gap-2 justify-items-center">
    <div className="transaction-detail-line text-sm">
        <DetailLine 
            icon={<GiConfirmed size={20} />}
            content={received ? 'Recebido' : 'Não recebido'} 
            action={<Toggle onClick={handleReceivedButtonClick} state={received} />}
        />
        <hr />
    </div>

    <div className="transaction-detail-line">
        <DetailLine
            icon={<CiCalendarDate size={20} />}
            content={
                <div className="flex space-x-2">
                    <button className="day-icon">Hoje</button>
                    <button className="day-icon">Ontem</button>
                    <button className="day-icon">Outros...</button>
                </div>
            }
        />
        <hr />
    </div>

    <div className="transaction-detail-line">
        <DetailLine
            icon={<FaPencilAlt size={20} />}
            content={
                <div className="flex">
                    <input type="text" className="max-w-xl" placeholder="Descrição" />
                </div>
            }
            action={'a'}
        />
        <hr />
    </div>

</div>
