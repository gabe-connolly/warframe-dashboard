import Arcanes from '../Components/arcane/Arcane';
import Archwings from '../Components/archwing/Archwing';
import Fish  from '../Components/fish/Fish';
import {GenericItems} from '../Components/GenericItem';
import Homepage from '../Components/homepage/Homepage';
import Mods from '../Components/mod/Mods';
import SecondaryWeapons from '../Components/secondary/SecondaryWeapons';
import Sentinels from '../Components/sentinel/Sentinels';

export const routes = [
    {
      'path': '/arcanes',
      'component': Arcanes,
    },
    {
      'path': '/archwing',
      'component': Archwings,
    },
    {
      'path': '/fish',
      'component': Fish,
    },
    {
      'path': '/mods',
      'component': Mods,
    },
    {
      'path': '/secondary',
      'component': SecondaryWeapons,
    },
    {
      'path': '/sentinels',
      'component': Sentinels,
    },
    {
      'path': '/',
      'component': Homepage,
      'exact': true,
    },
    {
      'path': '/:generic',
      'component': GenericItems,
    }
  ]