import React from "react";
import IEntityMap from "../redux/utils/entity-map.interface";
import { Sprint } from "../entities/sprint.entity";

interface IProps {
  sprints: IEntityMap<Sprint>
};

const SprintList = (props: IProps) => {
  const sprints = Object.values(props.sprints);
  return (
    <div>
      <h2>Sprints</h2>
      <ul>
        {
          sprints.map(
            (sprint: Sprint) => <li key={sprint.id}>sprint.title</li>
          ) || <span>Nenhuma sprint criada</span>
        }
      </ul>
    </div>
  )
}
