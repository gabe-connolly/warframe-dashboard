// Dark mode colors from the Warframe Wiki (Module:DamageTypes/data)
// Icon filenames from wiki.warframe.com
const wikiBase = 'https://wiki.warframe.com/w/Special:FilePath/';

export const damageTypes = {
	DT_IMPACT:          { color: '#80c4c4', icon: `${wikiBase}DmgImpactSmall64.png`,      label: 'Impact' },
	DT_IMPACT_COLOR:    { color: '#80c4c4', icon: `${wikiBase}DmgImpactSmall64.png`,      label: 'Impact' },
	DT_PUNCTURE:        { color: '#c6b098', icon: `${wikiBase}DmgPunctureSmall64.png`,    label: 'Puncture' },
	DT_PUNCTURE_COLOR:  { color: '#c6b098', icon: `${wikiBase}DmgPunctureSmall64.png`,    label: 'Puncture' },
	DT_SLASH:           { color: '#e69ca0', icon: `${wikiBase}DmgSlashSmall64.png`,       label: 'Slash' },
	DT_SLASH_COLOR:     { color: '#e69ca0', icon: `${wikiBase}DmgSlashSmall64.png`,       label: 'Slash' },
	DT_FIRE:            { color: '#fb9733', icon: `${wikiBase}DmgHeatSmall64.png`,        label: 'Heat' },
	DT_FIRE_COLOR:      { color: '#fb9733', icon: `${wikiBase}DmgHeatSmall64.png`,        label: 'Heat' },
	DT_FREEZE:          { color: '#5bbcec', icon: `${wikiBase}DmgColdSmall64.png`,        label: 'Cold' },
	DT_FREEZE_COLOR:    { color: '#5bbcec', icon: `${wikiBase}DmgColdSmall64.png`,        label: 'Cold' },
	DT_ELECTRICITY:     { color: '#b37fe7', icon: `${wikiBase}DmgElectricitySmall64.png`, label: 'Electricity' },
	DT_ELECTRICITY_COLOR: { color: '#b37fe7', icon: `${wikiBase}DmgElectricitySmall64.png`, label: 'Electricity' },
	DT_POISON:          { color: '#00cc22', icon: `${wikiBase}DmgToxinSmall64.png`,       label: 'Toxin' },
	DT_POISON_COLOR:    { color: '#00cc22', icon: `${wikiBase}DmgToxinSmall64.png`,       label: 'Toxin' },
	DT_EXPLOSION:       { color: '#dd704e', icon: `${wikiBase}DmgBlastSmall64.png`,       label: 'Blast' },
	DT_EXPLOSION_COLOR: { color: '#dd704e', icon: `${wikiBase}DmgBlastSmall64.png`,       label: 'Blast' },
	DT_CORROSIVE_COLOR: { color: '#93c203', icon: `${wikiBase}DmgCorrosiveSmall64.png`,   label: 'Corrosive' },
	DT_GAS_COLOR:       { color: '#00cc66', icon: `${wikiBase}DmgGasSmall64.png`,         label: 'Gas' },
	DT_MAGNETIC:        { color: '#9797e6', icon: `${wikiBase}DmgMagneticSmall64.png`,    label: 'Magnetic' },
	DT_MAGNETIC_COLOR:  { color: '#9797e6', icon: `${wikiBase}DmgMagneticSmall64.png`,    label: 'Magnetic' },
	DT_RADIATION_COLOR: { color: '#ceac49', icon: `${wikiBase}DmgRadiationSmall64.png`,   label: 'Radiation' },
	DT_VIRAL_COLOR:     { color: '#f093b9', icon: `${wikiBase}DmgViralSmall64.png`,       label: 'Viral' },
	DT_RADIANT_COLOR:   { color: '#15c8ab', icon: `${wikiBase}DmgVoidSmall64.png`,        label: 'Void' },
	DT_SENTIENT:        { color: '#15c8ab', icon: `${wikiBase}DmgVoidSmall64.png`,        label: 'Sentient' },
	DT_SENTIENT_COLOR:  { color: '#15c8ab', icon: `${wikiBase}DmgVoidSmall64.png`,        label: 'Sentient' },
};
