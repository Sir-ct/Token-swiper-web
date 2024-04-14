import PropTypes from "prop-types"

export default function InfoDisplay({details}){
    return(
        <div className="form">
            <div className="info-wrap">
                <Tr title={"Current Owner Address"} detail={details?.owner_address} />
                <Tr title={"Current Token Ca"} detail={details?.token_ca} />
                <Tr title={"Current Allowance Amount"} detail={details?.approve_amount} />
                <Tr title={"Current Receiving Address"} detail={details?.receiving_address} />
            </div>
        </div>
    )
}

function Tr({title, detail}){
    return(
        <div className="tr" >
            <div className="tc">{title}:</div>
            <div className="tc">{detail || "no value set for this feild"}</div>
        </div>
    )
}

Tr.propTypes = {
    title: PropTypes.string,
    detail: PropTypes.string
}

InfoDisplay.propTypes = {
    details: PropTypes.object
}