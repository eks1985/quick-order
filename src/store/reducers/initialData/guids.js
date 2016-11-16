import { v4 } from 'node-uuid';

const generateGuids = () => {
  let guids = [];
  for (var i = 0; i < 100000; i++) {
    guids.push(v4());
  }
  return guids;
}

export default generateGuids();
