import flags from '@/data/flags.json'

export const getFlag = (teamCode,width=18,height=12)=>{

    const flag  = flags.find(flag=>flag.team_code === teamCode)
    const url =  flag != undefined ? flag.flags.svg :""


    return url != "" ? <img src={url} width={width} height={height}/>:<div></div>
    
}

export const getGroups = (data) => {
  const stagesMap = {};

  data.forEach(item => {
    const group = item.group_name;

    if (!stagesMap[group]) {
      stagesMap[group] = {
        name: group,
        teams: []
      };
    }

    stagesMap[group].teams.push(item);
  });

  return Object.values(stagesMap);
};




export const getStages = (data) => {
  const stagesMap = {};

  data.forEach(item => {
    const stage = item.stage_name;

    if (!stagesMap[stage]) {
      stagesMap[stage] = {
        name: stage.replaceAll("-","").toUpperCase(),
        games: []
      };
    }

    stagesMap[stage].games.push(item);
  });

  return Object.values(stagesMap);
};