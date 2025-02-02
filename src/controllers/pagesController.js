import Arcanes from '../Components/arcane/Arcane';
import Archwings from '../Components/archwing/Archwing';
import { GenericItems } from '../Components/GenericItem';
import Homepage from '../Components/homepage/Homepage';
import Mods from '../Components/mod/Mods';
import PrimaryWeapons from '../Components/ranged-weapons/PrimaryWeapons';
import SecondaryWeapons from '../Components/ranged-weapons/SecondaryWeapons';
import Sentinels from '../Components/sentinel/Sentinels';

export const pages = [
    {
      'path': '/arcanes',
      'component': Arcanes,
    },
    {
      'path': '/archwing',
      'component': Archwings,
    },
    {
      'path': '/mods',
      'component': Mods,
    },
    {
      'path': '/primary',
      'component': PrimaryWeapons,
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