import { Link } from "react-router-dom";
import { Request } from "./Request";
import { SyntheticEvent } from "react";

interface RequestTableRowProps {
  request: Request;
  onRemove: (request: Request) => void;
}

function RequestTableRow({ request, onRemove }: RequestTableRowProps) {
  return (
    <tr>
      <td>
        <Link to={`/requests/detail/${request.id}`}>{request.id}</Link>
      </td>

      <td>
        {request.description} <br />
        <span className="text-secondary">{request.justification}</span>
      </td>
      <td>
        {" "}
        <span className="badge text-bg-primary mt-2">{request.status} </span>
      </td>
      <td> ${request.total}</td>
      <td>
        {request.user?.firstname} {request.user?.lastname}
        <br />
        <span className="text-secondary">{request.deliveryMode}</span>
      </td>

      <td>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" to={`/requests/edit/${request.id}`}>
            edit
          </Link>

          <a
            className="btn btn-outline-secondary"
            onClick={(event: SyntheticEvent) => {
              event.preventDefault();
              onRemove(request);
            }}
          >
            delete
          </a>
        </div>
      </td>
    </tr>
  );
}

export default RequestTableRow;
