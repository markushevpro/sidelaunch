package menu

type Rgb struct {
	R uint8 `json:"r"`
	G uint8 `json:"g"`
	B uint8 `json:"b"`
}

type Hsl struct {
	H float64 `json:"h"`
	S float64 `json:"s"`
	L float64 `json:"l"`
}

type Col struct {
	Hex  string `json:"hex"`
	Rgb  Rgb    `json:"rgb"`
	Hsl  Hsl    `json:"hsl"`
	Name string `json:"name"`
}

var Cols = []*Col{
	{
		Hex:  "#000000",
		Rgb:  Rgb{0, 0, 0},
		Hsl:  Hsl{0, 0, 0},
		Name: "Black",
	},
	{
		Hex:  "#800000",
		Rgb:  Rgb{128, 0, 0},
		Hsl:  Hsl{0, 100, 25},
		Name: "Maroon",
	},
	{
		Hex:  "#008000",
		Rgb:  Rgb{0, 128, 0},
		Hsl:  Hsl{120, 100, 25},
		Name: "Green",
	},
	{
		Hex:  "#808000",
		Rgb:  Rgb{128, 128, 0},
		Hsl:  Hsl{60, 100, 25},
		Name: "Olive",
	},
	{
		Hex:  "#000080",
		Rgb:  Rgb{0, 0, 128},
		Hsl:  Hsl{240, 100, 25},
		Name: "Navy",
	},
	{
		Hex:  "#800080",
		Rgb:  Rgb{128, 0, 128},
		Hsl:  Hsl{300, 100, 25},
		Name: "Purple",
	},
	{
		Hex:  "#008080",
		Rgb:  Rgb{0, 128, 128},
		Hsl:  Hsl{180, 100, 25},
		Name: "Teal",
	},
	{
		Hex:  "#c0c0c0",
		Rgb:  Rgb{192, 192, 192},
		Hsl:  Hsl{0, 0, 75},
		Name: "Silver",
	},
	{
		Hex:  "#808080",
		Rgb:  Rgb{128, 128, 128},
		Hsl:  Hsl{0, 0, 50},
		Name: "Grey",
	},
	{
		Hex:  "#ff0000",
		Rgb:  Rgb{255, 0, 0},
		Hsl:  Hsl{0, 100, 50},
		Name: "Red",
	},
	{
		Hex:  "#00ff00",
		Rgb:  Rgb{0, 255, 0},
		Hsl:  Hsl{120, 100, 50},
		Name: "Lime",
	},
	{
		Hex:  "#ffff00",
		Rgb:  Rgb{255, 255, 0},
		Hsl:  Hsl{60, 100, 50},
		Name: "Yellow",
	},
	{
		Hex:  "#0000ff",
		Rgb:  Rgb{0, 0, 255},
		Hsl:  Hsl{240, 100, 50},
		Name: "Blue",
	},
	{
		Hex:  "#ff00ff",
		Rgb:  Rgb{255, 0, 255},
		Hsl:  Hsl{300, 100, 50},
		Name: "Fuchsia",
	},
	{
		Hex:  "#00ffff",
		Rgb:  Rgb{0, 255, 255},
		Hsl:  Hsl{180, 100, 50},
		Name: "Aqua",
	},
	{
		Hex:  "#ffffff",
		Rgb:  Rgb{255, 255, 255},
		Hsl:  Hsl{0, 0, 100},
		Name: "White",
	},
	{
		Hex:  "#000000",
		Rgb:  Rgb{0, 0, 0},
		Hsl:  Hsl{0, 0, 0},
		Name: "Grey0",
	},
	{
		Hex:  "#00005f",
		Rgb:  Rgb{0, 0, 95},
		Hsl:  Hsl{240, 100, 18},
		Name: "NavyBlue",
	},
	{
		Hex:  "#000087",
		Rgb:  Rgb{0, 0, 135},
		Hsl:  Hsl{240, 100, 26},
		Name: "DarkBlue",
	},
	{
		Hex:  "#0000af",
		Rgb:  Rgb{0, 0, 175},
		Hsl:  Hsl{240, 100, 34},
		Name: "Blue3",
	},
	{
		Hex:  "#0000d7",
		Rgb:  Rgb{0, 0, 215},
		Hsl:  Hsl{240, 100, 42},
		Name: "Blue3",
	},
	{
		Hex:  "#0000ff",
		Rgb:  Rgb{0, 0, 255},
		Hsl:  Hsl{240, 100, 50},
		Name: "Blue1",
	},
	{
		Hex:  "#005f00",
		Rgb:  Rgb{0, 95, 0},
		Hsl:  Hsl{120, 100, 18},
		Name: "DarkGreen",
	},
	{
		Hex:  "#005f5f",
		Rgb:  Rgb{0, 95, 95},
		Hsl:  Hsl{180, 100, 18},
		Name: "DeepSkyBlue4",
	},
	{
		Hex:  "#005f87",
		Rgb:  Rgb{0, 95, 135},
		Hsl:  Hsl{197.777777777778, 100, 26},
		Name: "DeepSkyBlue4",
	},
	{
		Hex:  "#005faf",
		Rgb:  Rgb{0, 95, 175},
		Hsl:  Hsl{207.428571428571, 100, 34},
		Name: "DeepSkyBlue4",
	},
	{
		Hex:  "#005fd7",
		Rgb:  Rgb{0, 95, 215},
		Hsl:  Hsl{213.488372093023, 100, 42},
		Name: "DodgerBlue3",
	},
	{
		Hex:  "#005fff",
		Rgb:  Rgb{0, 95, 255},
		Hsl:  Hsl{217.647058823529, 100, 50},
		Name: "DodgerBlue2",
	},
	{
		Hex:  "#008700",
		Rgb:  Rgb{0, 135, 0},
		Hsl:  Hsl{120, 100, 26},
		Name: "Green4",
	},
	{
		Hex:  "#00875f",
		Rgb:  Rgb{0, 135, 95},
		Hsl:  Hsl{162.222222222222, 100, 26},
		Name: "SpringGreen4",
	},
	{
		Hex:  "#008787",
		Rgb:  Rgb{0, 135, 135},
		Hsl:  Hsl{180, 100, 26},
		Name: "Turquoise4",
	},
	{
		Hex:  "#0087af",
		Rgb:  Rgb{0, 135, 175},
		Hsl:  Hsl{193.714285714286, 100, 34},
		Name: "DeepSkyBlue3",
	},
	{
		Hex:  "#0087d7",
		Rgb:  Rgb{0, 135, 215},
		Hsl:  Hsl{202.325581395349, 100, 42},
		Name: "DeepSkyBlue3",
	},
	{
		Hex:  "#0087ff",
		Rgb:  Rgb{0, 135, 255},
		Hsl:  Hsl{208.235294117647, 100, 50},
		Name: "DodgerBlue1",
	},
	{
		Hex:  "#00af00",
		Rgb:  Rgb{0, 175, 0},
		Hsl:  Hsl{120, 100, 34},
		Name: "Green3",
	},
	{
		Hex:  "#00af5f",
		Rgb:  Rgb{0, 175, 95},
		Hsl:  Hsl{152.571428571429, 100, 34},
		Name: "SpringGreen3",
	},
	{
		Hex:  "#00af87",
		Rgb:  Rgb{0, 175, 135},
		Hsl:  Hsl{166.285714285714, 100, 34},
		Name: "DarkCyan",
	},
	{
		Hex:  "#00afaf",
		Rgb:  Rgb{0, 175, 175},
		Hsl:  Hsl{180, 100, 34},
		Name: "LightSeaGreen",
	},
	{
		Hex:  "#00afd7",
		Rgb:  Rgb{0, 175, 215},
		Hsl:  Hsl{191.162790697674, 100, 42},
		Name: "DeepSkyBlue2",
	},
	{
		Hex:  "#00afff",
		Rgb:  Rgb{0, 175, 255},
		Hsl:  Hsl{198.823529411765, 100, 50},
		Name: "DeepSkyBlue1",
	},
	{
		Hex:  "#00d700",
		Rgb:  Rgb{0, 215, 0},
		Hsl:  Hsl{120, 100, 42},
		Name: "Green3",
	},
	{
		Hex:  "#00d75f",
		Rgb:  Rgb{0, 215, 95},
		Hsl:  Hsl{146.511627906977, 100, 42},
		Name: "SpringGreen3",
	},
	{
		Hex:  "#00d787",
		Rgb:  Rgb{0, 215, 135},
		Hsl:  Hsl{157.674418604651, 100, 42},
		Name: "SpringGreen2",
	},
	{
		Hex:  "#00d7af",
		Rgb:  Rgb{0, 215, 175},
		Hsl:  Hsl{168.837209302326, 100, 42},
		Name: "Cyan3",
	},
	{
		Hex:  "#00d7d7",
		Rgb:  Rgb{0, 215, 215},
		Hsl:  Hsl{180, 100, 42},
		Name: "DarkTurquoise",
	},
	{
		Hex:  "#00d7ff",
		Rgb:  Rgb{0, 215, 255},
		Hsl:  Hsl{189.411764705882, 100, 50},
		Name: "Turquoise2",
	},
	{
		Hex:  "#00ff00",
		Rgb:  Rgb{0, 255, 0},
		Hsl:  Hsl{120, 100, 50},
		Name: "Green1",
	},
	{
		Hex:  "#00ff5f",
		Rgb:  Rgb{0, 255, 95},
		Hsl:  Hsl{142.352941176471, 100, 50},
		Name: "SpringGreen2",
	},
	{
		Hex:  "#00ff87",
		Rgb:  Rgb{0, 255, 135},
		Hsl:  Hsl{151.764705882353, 100, 50},
		Name: "SpringGreen1",
	},
	{
		Hex:  "#00ffaf",
		Rgb:  Rgb{0, 255, 175},
		Hsl:  Hsl{161.176470588235, 100, 50},
		Name: "MediumSpringGreen",
	},
	{
		Hex:  "#00ffd7",
		Rgb:  Rgb{0, 255, 215},
		Hsl:  Hsl{170.588235294118, 100, 50},
		Name: "Cyan2",
	},
	{
		Hex:  "#00ffff",
		Rgb:  Rgb{0, 255, 255},
		Hsl:  Hsl{180, 100, 50},
		Name: "Cyan1",
	},
	{
		Hex:  "#5f0000",
		Rgb:  Rgb{95, 0, 0},
		Hsl:  Hsl{0, 100, 18},
		Name: "DarkRed",
	},
	{
		Hex:  "#5f005f",
		Rgb:  Rgb{95, 0, 95},
		Hsl:  Hsl{300, 100, 18},
		Name: "DeepPink4",
	},
	{
		Hex:  "#5f0087",
		Rgb:  Rgb{95, 0, 135},
		Hsl:  Hsl{282.222222222222, 100, 26},
		Name: "Purple4",
	},
	{
		Hex:  "#5f00af",
		Rgb:  Rgb{95, 0, 175},
		Hsl:  Hsl{272.571428571429, 100, 34},
		Name: "Purple4",
	},
	{
		Hex:  "#5f00d7",
		Rgb:  Rgb{95, 0, 215},
		Hsl:  Hsl{266.511627906977, 100, 42},
		Name: "Purple3",
	},
	{
		Hex:  "#5f00ff",
		Rgb:  Rgb{95, 0, 255},
		Hsl:  Hsl{262.352941176471, 100, 50},
		Name: "BlueViolet",
	},
	{
		Hex:  "#5f5f00",
		Rgb:  Rgb{95, 95, 0},
		Hsl:  Hsl{60, 100, 18},
		Name: "Orange4",
	},
	{
		Hex:  "#5f5f5f",
		Rgb:  Rgb{95, 95, 95},
		Hsl:  Hsl{0, 0, 37},
		Name: "Grey37",
	},
	{
		Hex:  "#5f5f87",
		Rgb:  Rgb{95, 95, 135},
		Hsl:  Hsl{240, 17, 45},
		Name: "MediumPurple4",
	},
	{
		Hex:  "#5f5faf",
		Rgb:  Rgb{95, 95, 175},
		Hsl:  Hsl{240, 33, 52},
		Name: "SlateBlue3",
	},
	{
		Hex:  "#5f5fd7",
		Rgb:  Rgb{95, 95, 215},
		Hsl:  Hsl{240, 60, 60},
		Name: "SlateBlue3",
	},
	{
		Hex:  "#5f5fff",
		Rgb:  Rgb{95, 95, 255},
		Hsl:  Hsl{240, 100, 68},
		Name: "RoyalBlue1",
	},
	{
		Hex:  "#5f8700",
		Rgb:  Rgb{95, 135, 0},
		Hsl:  Hsl{77.7777777777778, 100, 26},
		Name: "Chartreuse4",
	},
	{
		Hex:  "#5f875f",
		Rgb:  Rgb{95, 135, 95},
		Hsl:  Hsl{120, 17, 45},
		Name: "DarkSeaGreen4",
	},
	{
		Hex:  "#5f8787",
		Rgb:  Rgb{95, 135, 135},
		Hsl:  Hsl{180, 17, 45},
		Name: "PaleTurquoise4",
	},
	{
		Hex:  "#5f87af",
		Rgb:  Rgb{95, 135, 175},
		Hsl:  Hsl{210, 33, 52},
		Name: "SteelBlue",
	},
	{
		Hex:  "#5f87d7",
		Rgb:  Rgb{95, 135, 215},
		Hsl:  Hsl{220, 60, 60},
		Name: "SteelBlue3",
	},
	{
		Hex:  "#5f87ff",
		Rgb:  Rgb{95, 135, 255},
		Hsl:  Hsl{225, 100, 68},
		Name: "CornflowerBlue",
	},
	{
		Hex:  "#5faf00",
		Rgb:  Rgb{95, 175, 0},
		Hsl:  Hsl{87.4285714285714, 100, 34},
		Name: "Chartreuse3",
	},
	{
		Hex:  "#5faf5f",
		Rgb:  Rgb{95, 175, 95},
		Hsl:  Hsl{120, 33, 52},
		Name: "DarkSeaGreen4",
	},
	{
		Hex:  "#5faf87",
		Rgb:  Rgb{95, 175, 135},
		Hsl:  Hsl{150, 33, 52},
		Name: "CadetBlue",
	},
	{
		Hex:  "#5fafaf",
		Rgb:  Rgb{95, 175, 175},
		Hsl:  Hsl{180, 33, 52},
		Name: "CadetBlue",
	},
	{
		Hex:  "#5fafd7",
		Rgb:  Rgb{95, 175, 215},
		Hsl:  Hsl{200, 60, 60},
		Name: "SkyBlue3",
	},
	{
		Hex:  "#5fafff",
		Rgb:  Rgb{95, 175, 255},
		Hsl:  Hsl{210, 100, 68},
		Name: "SteelBlue1",
	},
	{
		Hex:  "#5fd700",
		Rgb:  Rgb{95, 215, 0},
		Hsl:  Hsl{93.4883720930233, 100, 42},
		Name: "Chartreuse3",
	},
	{
		Hex:  "#5fd75f",
		Rgb:  Rgb{95, 215, 95},
		Hsl:  Hsl{120, 60, 60},
		Name: "PaleGreen3",
	},
	{
		Hex:  "#5fd787",
		Rgb:  Rgb{95, 215, 135},
		Hsl:  Hsl{140, 60, 60},
		Name: "SeaGreen3",
	},
	{
		Hex:  "#5fd7af",
		Rgb:  Rgb{95, 215, 175},
		Hsl:  Hsl{160, 60, 60},
		Name: "Aquamarine3",
	},
	{
		Hex:  "#5fd7d7",
		Rgb:  Rgb{95, 215, 215},
		Hsl:  Hsl{180, 60, 60},
		Name: "MediumTurquoise",
	},
	{
		Hex:  "#5fd7ff",
		Rgb:  Rgb{95, 215, 255},
		Hsl:  Hsl{195, 100, 68},
		Name: "SteelBlue1",
	},
	{
		Hex:  "#5fff00",
		Rgb:  Rgb{95, 255, 0},
		Hsl:  Hsl{97.6470588235294, 100, 50},
		Name: "Chartreuse2",
	},
	{
		Hex:  "#5fff5f",
		Rgb:  Rgb{95, 255, 95},
		Hsl:  Hsl{120, 100, 68},
		Name: "SeaGreen2",
	},
	{
		Hex:  "#5fff87",
		Rgb:  Rgb{95, 255, 135},
		Hsl:  Hsl{135, 100, 68},
		Name: "SeaGreen1",
	},
	{
		Hex:  "#5fffaf",
		Rgb:  Rgb{95, 255, 175},
		Hsl:  Hsl{150, 100, 68},
		Name: "SeaGreen1",
	},
	{
		Hex:  "#5fffd7",
		Rgb:  Rgb{95, 255, 215},
		Hsl:  Hsl{165, 100, 68},
		Name: "Aquamarine1",
	},
	{
		Hex:  "#5fffff",
		Rgb:  Rgb{95, 255, 255},
		Hsl:  Hsl{180, 100, 68},
		Name: "DarkSlateGray2",
	},
	{
		Hex:  "#870000",
		Rgb:  Rgb{135, 0, 0},
		Hsl:  Hsl{0, 100, 26},
		Name: "DarkRed",
	},
	{
		Hex:  "#87005f",
		Rgb:  Rgb{135, 0, 95},
		Hsl:  Hsl{317.777777777778, 100, 26},
		Name: "DeepPink4",
	},
	{
		Hex:  "#870087",
		Rgb:  Rgb{135, 0, 135},
		Hsl:  Hsl{300, 100, 26},
		Name: "DarkMagenta",
	},
	{
		Hex:  "#8700af",
		Rgb:  Rgb{135, 0, 175},
		Hsl:  Hsl{286.285714285714, 100, 34},
		Name: "DarkMagenta",
	},
	{
		Hex:  "#8700d7",
		Rgb:  Rgb{135, 0, 215},
		Hsl:  Hsl{277.674418604651, 100, 42},
		Name: "DarkViolet",
	},
	{
		Hex:  "#8700ff",
		Rgb:  Rgb{135, 0, 255},
		Hsl:  Hsl{271.764705882353, 100, 50},
		Name: "Purple",
	},
	{
		Hex:  "#875f00",
		Rgb:  Rgb{135, 95, 0},
		Hsl:  Hsl{42.2222222222222, 100, 26},
		Name: "Orange4",
	},
	{
		Hex:  "#875f5f",
		Rgb:  Rgb{135, 95, 95},
		Hsl:  Hsl{0, 17, 45},
		Name: "LightPink4",
	},
	{
		Hex:  "#875f87",
		Rgb:  Rgb{135, 95, 135},
		Hsl:  Hsl{300, 17, 45},
		Name: "Plum4",
	},
	{
		Hex:  "#875faf",
		Rgb:  Rgb{135, 95, 175},
		Hsl:  Hsl{270, 33, 52},
		Name: "MediumPurple3",
	},
	{
		Hex:  "#875fd7",
		Rgb:  Rgb{135, 95, 215},
		Hsl:  Hsl{260, 60, 60},
		Name: "MediumPurple3",
	},
	{
		Hex:  "#875fff",
		Rgb:  Rgb{135, 95, 255},
		Hsl:  Hsl{255, 100, 68},
		Name: "SlateBlue1",
	},
	{
		Hex:  "#878700",
		Rgb:  Rgb{135, 135, 0},
		Hsl:  Hsl{60, 100, 26},
		Name: "Yellow4",
	},
	{
		Hex:  "#87875f",
		Rgb:  Rgb{135, 135, 95},
		Hsl:  Hsl{60, 17, 45},
		Name: "Wheat4",
	},
	{
		Hex:  "#878787",
		Rgb:  Rgb{135, 135, 135},
		Hsl:  Hsl{0, 0, 52},
		Name: "Grey53",
	},
	{
		Hex:  "#8787af",
		Rgb:  Rgb{135, 135, 175},
		Hsl:  Hsl{240, 20, 60},
		Name: "LightSlateGrey",
	},
	{
		Hex:  "#8787d7",
		Rgb:  Rgb{135, 135, 215},
		Hsl:  Hsl{240, 50, 68},
		Name: "MediumPurple",
	},
	{
		Hex:  "#8787ff",
		Rgb:  Rgb{135, 135, 255},
		Hsl:  Hsl{240, 100, 76},
		Name: "LightSlateBlue",
	},
	{
		Hex:  "#87af00",
		Rgb:  Rgb{135, 175, 0},
		Hsl:  Hsl{73.7142857142857, 100, 34},
		Name: "Yellow4",
	},
	{
		Hex:  "#87af5f",
		Rgb:  Rgb{135, 175, 95},
		Hsl:  Hsl{90, 33, 52},
		Name: "DarkOliveGreen3",
	},
	{
		Hex:  "#87af87",
		Rgb:  Rgb{135, 175, 135},
		Hsl:  Hsl{120, 20, 60},
		Name: "DarkSeaGreen",
	},
	{
		Hex:  "#87afaf",
		Rgb:  Rgb{135, 175, 175},
		Hsl:  Hsl{180, 20, 60},
		Name: "LightSkyBlue3",
	},
	{
		Hex:  "#87afd7",
		Rgb:  Rgb{135, 175, 215},
		Hsl:  Hsl{210, 50, 68},
		Name: "LightSkyBlue3",
	},
	{
		Hex:  "#87afff",
		Rgb:  Rgb{135, 175, 255},
		Hsl:  Hsl{220, 100, 76},
		Name: "SkyBlue2",
	},
	{
		Hex:  "#87d700",
		Rgb:  Rgb{135, 215, 0},
		Hsl:  Hsl{82.3255813953488, 100, 42},
		Name: "Chartreuse2",
	},
	{
		Hex:  "#87d75f",
		Rgb:  Rgb{135, 215, 95},
		Hsl:  Hsl{100, 60, 60},
		Name: "DarkOliveGreen3",
	},
	{
		Hex:  "#87d787",
		Rgb:  Rgb{135, 215, 135},
		Hsl:  Hsl{120, 50, 68},
		Name: "PaleGreen3",
	},
	{
		Hex:  "#87d7af",
		Rgb:  Rgb{135, 215, 175},
		Hsl:  Hsl{150, 50, 68},
		Name: "DarkSeaGreen3",
	},
	{
		Hex:  "#87d7d7",
		Rgb:  Rgb{135, 215, 215},
		Hsl:  Hsl{180, 50, 68},
		Name: "DarkSlateGray3",
	},
	{
		Hex:  "#87d7ff",
		Rgb:  Rgb{135, 215, 255},
		Hsl:  Hsl{200, 100, 76},
		Name: "SkyBlue1",
	},
	{
		Hex:  "#87ff00",
		Rgb:  Rgb{135, 255, 0},
		Hsl:  Hsl{88.2352941176471, 100, 50},
		Name: "Chartreuse1",
	},
	{
		Hex:  "#87ff5f",
		Rgb:  Rgb{135, 255, 95},
		Hsl:  Hsl{105, 100, 68},
		Name: "LightGreen",
	},
	{
		Hex:  "#87ff87",
		Rgb:  Rgb{135, 255, 135},
		Hsl:  Hsl{120, 100, 76},
		Name: "LightGreen",
	},
	{
		Hex:  "#87ffaf",
		Rgb:  Rgb{135, 255, 175},
		Hsl:  Hsl{140, 100, 76},
		Name: "PaleGreen1",
	},
	{
		Hex:  "#87ffd7",
		Rgb:  Rgb{135, 255, 215},
		Hsl:  Hsl{160, 100, 76},
		Name: "Aquamarine1",
	},
	{
		Hex:  "#87ffff",
		Rgb:  Rgb{135, 255, 255},
		Hsl:  Hsl{180, 100, 76},
		Name: "DarkSlateGray1",
	},
	{
		Hex:  "#af0000",
		Rgb:  Rgb{175, 0, 0},
		Hsl:  Hsl{0, 100, 34},
		Name: "Red3",
	},
	{
		Hex:  "#af005f",
		Rgb:  Rgb{175, 0, 95},
		Hsl:  Hsl{327.428571428571, 100, 34},
		Name: "DeepPink4",
	},
	{
		Hex:  "#af0087",
		Rgb:  Rgb{175, 0, 135},
		Hsl:  Hsl{313.714285714286, 100, 34},
		Name: "MediumVioletRed",
	},
	{
		Hex:  "#af00af",
		Rgb:  Rgb{175, 0, 175},
		Hsl:  Hsl{300, 100, 34},
		Name: "Magenta3",
	},
	{
		Hex:  "#af00d7",
		Rgb:  Rgb{175, 0, 215},
		Hsl:  Hsl{288.837209302326, 100, 42},
		Name: "DarkViolet",
	},
	{
		Hex:  "#af00ff",
		Rgb:  Rgb{175, 0, 255},
		Hsl:  Hsl{281.176470588235, 100, 50},
		Name: "Purple",
	},
	{
		Hex:  "#af5f00",
		Rgb:  Rgb{175, 95, 0},
		Hsl:  Hsl{32.5714285714286, 100, 34},
		Name: "DarkOrange3",
	},
	{
		Hex:  "#af5f5f",
		Rgb:  Rgb{175, 95, 95},
		Hsl:  Hsl{0, 33, 52},
		Name: "IndianRed",
	},
	{
		Hex:  "#af5f87",
		Rgb:  Rgb{175, 95, 135},
		Hsl:  Hsl{330, 33, 52},
		Name: "HotPink3",
	},
	{
		Hex:  "#af5faf",
		Rgb:  Rgb{175, 95, 175},
		Hsl:  Hsl{300, 33, 52},
		Name: "MediumOrchid3",
	},
	{
		Hex:  "#af5fd7",
		Rgb:  Rgb{175, 95, 215},
		Hsl:  Hsl{280, 60, 60},
		Name: "MediumOrchid",
	},
	{
		Hex:  "#af5fff",
		Rgb:  Rgb{175, 95, 255},
		Hsl:  Hsl{270, 100, 68},
		Name: "MediumPurple2",
	},
	{
		Hex:  "#af8700",
		Rgb:  Rgb{175, 135, 0},
		Hsl:  Hsl{46.2857142857143, 100, 34},
		Name: "DarkGoldenrod",
	},
	{
		Hex:  "#af875f",
		Rgb:  Rgb{175, 135, 95},
		Hsl:  Hsl{30, 33, 52},
		Name: "LightSalmon3",
	},
	{
		Hex:  "#af8787",
		Rgb:  Rgb{175, 135, 135},
		Hsl:  Hsl{0, 20, 60},
		Name: "RosyBrown",
	},
	{
		Hex:  "#af87af",
		Rgb:  Rgb{175, 135, 175},
		Hsl:  Hsl{300, 20, 60},
		Name: "Grey63",
	},
	{
		Hex:  "#af87d7",
		Rgb:  Rgb{175, 135, 215},
		Hsl:  Hsl{270, 50, 68},
		Name: "MediumPurple2",
	},
	{
		Hex:  "#af87ff",
		Rgb:  Rgb{175, 135, 255},
		Hsl:  Hsl{260, 100, 76},
		Name: "MediumPurple1",
	},
	{
		Hex:  "#afaf00",
		Rgb:  Rgb{175, 175, 0},
		Hsl:  Hsl{60, 100, 34},
		Name: "Gold3",
	},
	{
		Hex:  "#afaf5f",
		Rgb:  Rgb{175, 175, 95},
		Hsl:  Hsl{60, 33, 52},
		Name: "DarkKhaki",
	},
	{
		Hex:  "#afaf87",
		Rgb:  Rgb{175, 175, 135},
		Hsl:  Hsl{60, 20, 60},
		Name: "NavajoWhite3",
	},
	{
		Hex:  "#afafaf",
		Rgb:  Rgb{175, 175, 175},
		Hsl:  Hsl{0, 0, 68},
		Name: "Grey69",
	},
	{
		Hex:  "#afafd7",
		Rgb:  Rgb{175, 175, 215},
		Hsl:  Hsl{240, 33, 76},
		Name: "LightSteelBlue3",
	},
	{
		Hex:  "#afafff",
		Rgb:  Rgb{175, 175, 255},
		Hsl:  Hsl{240, 100, 84},
		Name: "LightSteelBlue",
	},
	{
		Hex:  "#afd700",
		Rgb:  Rgb{175, 215, 0},
		Hsl:  Hsl{71.1627906976744, 100, 42},
		Name: "Yellow3",
	},
	{
		Hex:  "#afd75f",
		Rgb:  Rgb{175, 215, 95},
		Hsl:  Hsl{80, 60, 60},
		Name: "DarkOliveGreen3",
	},
	{
		Hex:  "#afd787",
		Rgb:  Rgb{175, 215, 135},
		Hsl:  Hsl{90, 50, 68},
		Name: "DarkSeaGreen3",
	},
	{
		Hex:  "#afd7af",
		Rgb:  Rgb{175, 215, 175},
		Hsl:  Hsl{120, 33, 76},
		Name: "DarkSeaGreen2",
	},
	{
		Hex:  "#afd7d7",
		Rgb:  Rgb{175, 215, 215},
		Hsl:  Hsl{180, 33, 76},
		Name: "LightCyan3",
	},
	{
		Hex:  "#afd7ff",
		Rgb:  Rgb{175, 215, 255},
		Hsl:  Hsl{210, 100, 84},
		Name: "LightSkyBlue1",
	},
	{
		Hex:  "#afff00",
		Rgb:  Rgb{175, 255, 0},
		Hsl:  Hsl{78.8235294117647, 100, 50},
		Name: "GreenYellow",
	},
	{
		Hex:  "#afff5f",
		Rgb:  Rgb{175, 255, 95},
		Hsl:  Hsl{90, 100, 68},
		Name: "DarkOliveGreen2",
	},
	{
		Hex:  "#afff87",
		Rgb:  Rgb{175, 255, 135},
		Hsl:  Hsl{100, 100, 76},
		Name: "PaleGreen1",
	},
	{
		Hex:  "#afffaf",
		Rgb:  Rgb{175, 255, 175},
		Hsl:  Hsl{120, 100, 84},
		Name: "DarkSeaGreen2",
	},
	{
		Hex:  "#afffd7",
		Rgb:  Rgb{175, 255, 215},
		Hsl:  Hsl{150, 100, 84},
		Name: "DarkSeaGreen1",
	},
	{
		Hex:  "#afffff",
		Rgb:  Rgb{175, 255, 255},
		Hsl:  Hsl{180, 100, 84},
		Name: "PaleTurquoise1",
	},
	{
		Hex:  "#d70000",
		Rgb:  Rgb{215, 0, 0},
		Hsl:  Hsl{0, 100, 42},
		Name: "Red3",
	},
	{
		Hex:  "#d7005f",
		Rgb:  Rgb{215, 0, 95},
		Hsl:  Hsl{333.488372093023, 100, 42},
		Name: "DeepPink3",
	},
	{
		Hex:  "#d70087",
		Rgb:  Rgb{215, 0, 135},
		Hsl:  Hsl{322.325581395349, 100, 42},
		Name: "DeepPink3",
	},
	{
		Hex:  "#d700af",
		Rgb:  Rgb{215, 0, 175},
		Hsl:  Hsl{311.162790697674, 100, 42},
		Name: "Magenta3",
	},
	{
		Hex:  "#d700d7",
		Rgb:  Rgb{215, 0, 215},
		Hsl:  Hsl{300, 100, 42},
		Name: "Magenta3",
	},
	{
		Hex:  "#d700ff",
		Rgb:  Rgb{215, 0, 255},
		Hsl:  Hsl{290.588235294118, 100, 50},
		Name: "Magenta2",
	},
	{
		Hex:  "#d75f00",
		Rgb:  Rgb{215, 95, 0},
		Hsl:  Hsl{26.5116279069767, 100, 42},
		Name: "DarkOrange3",
	},
	{
		Hex:  "#d75f5f",
		Rgb:  Rgb{215, 95, 95},
		Hsl:  Hsl{0, 60, 60},
		Name: "IndianRed",
	},
	{
		Hex:  "#d75f87",
		Rgb:  Rgb{215, 95, 135},
		Hsl:  Hsl{340, 60, 60},
		Name: "HotPink3",
	},
	{
		Hex:  "#d75faf",
		Rgb:  Rgb{215, 95, 175},
		Hsl:  Hsl{320, 60, 60},
		Name: "HotPink2",
	},
	{
		Hex:  "#d75fd7",
		Rgb:  Rgb{215, 95, 215},
		Hsl:  Hsl{300, 60, 60},
		Name: "Orchid",
	},
	{
		Hex:  "#d75fff",
		Rgb:  Rgb{215, 95, 255},
		Hsl:  Hsl{285, 100, 68},
		Name: "MediumOrchid1",
	},
	{
		Hex:  "#d78700",
		Rgb:  Rgb{215, 135, 0},
		Hsl:  Hsl{37.6744186046512, 100, 42},
		Name: "Orange3",
	},
	{
		Hex:  "#d7875f",
		Rgb:  Rgb{215, 135, 95},
		Hsl:  Hsl{20, 60, 60},
		Name: "LightSalmon3",
	},
	{
		Hex:  "#d78787",
		Rgb:  Rgb{215, 135, 135},
		Hsl:  Hsl{0, 50, 68},
		Name: "LightPink3",
	},
	{
		Hex:  "#d787af",
		Rgb:  Rgb{215, 135, 175},
		Hsl:  Hsl{330, 50, 68},
		Name: "Pink3",
	},
	{
		Hex:  "#d787d7",
		Rgb:  Rgb{215, 135, 215},
		Hsl:  Hsl{300, 50, 68},
		Name: "Plum3",
	},
	{
		Hex:  "#d787ff",
		Rgb:  Rgb{215, 135, 255},
		Hsl:  Hsl{280, 100, 76},
		Name: "Violet",
	},
	{
		Hex:  "#d7af00",
		Rgb:  Rgb{215, 175, 0},
		Hsl:  Hsl{48.8372093023256, 100, 42},
		Name: "Gold3",
	},
	{
		Hex:  "#d7af5f",
		Rgb:  Rgb{215, 175, 95},
		Hsl:  Hsl{40, 60, 60},
		Name: "LightGoldenrod3",
	},
	{
		Hex:  "#d7af87",
		Rgb:  Rgb{215, 175, 135},
		Hsl:  Hsl{30, 50, 68},
		Name: "Tan",
	},
	{
		Hex:  "#d7afaf",
		Rgb:  Rgb{215, 175, 175},
		Hsl:  Hsl{0, 33, 76},
		Name: "MistyRose3",
	},
	{
		Hex:  "#d7afd7",
		Rgb:  Rgb{215, 175, 215},
		Hsl:  Hsl{300, 33, 76},
		Name: "Thistle3",
	},
	{
		Hex:  "#d7afff",
		Rgb:  Rgb{215, 175, 255},
		Hsl:  Hsl{270, 100, 84},
		Name: "Plum2",
	},
	{
		Hex:  "#d7d700",
		Rgb:  Rgb{215, 215, 0},
		Hsl:  Hsl{60, 100, 42},
		Name: "Yellow3",
	},
	{
		Hex:  "#d7d75f",
		Rgb:  Rgb{215, 215, 95},
		Hsl:  Hsl{60, 60, 60},
		Name: "Khaki3",
	},
	{
		Hex:  "#d7d787",
		Rgb:  Rgb{215, 215, 135},
		Hsl:  Hsl{60, 50, 68},
		Name: "LightGoldenrod2",
	},
	{
		Hex:  "#d7d7af",
		Rgb:  Rgb{215, 215, 175},
		Hsl:  Hsl{60, 33, 76},
		Name: "LightYellow3",
	},
	{
		Hex:  "#d7d7d7",
		Rgb:  Rgb{215, 215, 215},
		Hsl:  Hsl{0, 0, 84},
		Name: "Grey84",
	},
	{
		Hex:  "#d7d7ff",
		Rgb:  Rgb{215, 215, 255},
		Hsl:  Hsl{240, 100, 92},
		Name: "LightSteelBlue1",
	},
	{
		Hex:  "#d7ff00",
		Rgb:  Rgb{215, 255, 0},
		Hsl:  Hsl{69.4117647058823, 100, 50},
		Name: "Yellow2",
	},
	{
		Hex:  "#d7ff5f",
		Rgb:  Rgb{215, 255, 95},
		Hsl:  Hsl{75, 100, 68},
		Name: "DarkOliveGreen1",
	},
	{
		Hex:  "#d7ff87",
		Rgb:  Rgb{215, 255, 135},
		Hsl:  Hsl{80, 100, 76},
		Name: "DarkOliveGreen1",
	},
	{
		Hex:  "#d7ffaf",
		Rgb:  Rgb{215, 255, 175},
		Hsl:  Hsl{90, 100, 84},
		Name: "DarkSeaGreen1",
	},
	{
		Hex:  "#d7ffd7",
		Rgb:  Rgb{215, 255, 215},
		Hsl:  Hsl{120, 100, 92},
		Name: "Honeydew2",
	},
	{
		Hex:  "#d7ffff",
		Rgb:  Rgb{215, 255, 255},
		Hsl:  Hsl{180, 100, 92},
		Name: "LightCyan1",
	},
	{
		Hex:  "#ff0000",
		Rgb:  Rgb{255, 0, 0},
		Hsl:  Hsl{0, 100, 50},
		Name: "Red1",
	},
	{
		Hex:  "#ff005f",
		Rgb:  Rgb{255, 0, 95},
		Hsl:  Hsl{337.647058823529, 100, 50},
		Name: "DeepPink2",
	},
	{
		Hex:  "#ff0087",
		Rgb:  Rgb{255, 0, 135},
		Hsl:  Hsl{328.235294117647, 100, 50},
		Name: "DeepPink1",
	},
	{
		Hex:  "#ff00af",
		Rgb:  Rgb{255, 0, 175},
		Hsl:  Hsl{318.823529411765, 100, 50},
		Name: "DeepPink1",
	},
	{
		Hex:  "#ff00d7",
		Rgb:  Rgb{255, 0, 215},
		Hsl:  Hsl{309.411764705882, 100, 50},
		Name: "Magenta2",
	},
	{
		Hex:  "#ff00ff",
		Rgb:  Rgb{255, 0, 255},
		Hsl:  Hsl{300, 100, 50},
		Name: "Magenta1",
	},
	{
		Hex:  "#ff5f00",
		Rgb:  Rgb{255, 95, 0},
		Hsl:  Hsl{22.3529411764706, 100, 50},
		Name: "OrangeRed1",
	},
	{
		Hex:  "#ff5f5f",
		Rgb:  Rgb{255, 95, 95},
		Hsl:  Hsl{0, 100, 68},
		Name: "IndianRed1",
	},
	{
		Hex:  "#ff5f87",
		Rgb:  Rgb{255, 95, 135},
		Hsl:  Hsl{345, 100, 68},
		Name: "IndianRed1",
	},
	{
		Hex:  "#ff5faf",
		Rgb:  Rgb{255, 95, 175},
		Hsl:  Hsl{330, 100, 68},
		Name: "HotPink",
	},
	{
		Hex:  "#ff5fd7",
		Rgb:  Rgb{255, 95, 215},
		Hsl:  Hsl{315, 100, 68},
		Name: "HotPink",
	},
	{
		Hex:  "#ff5fff",
		Rgb:  Rgb{255, 95, 255},
		Hsl:  Hsl{300, 100, 68},
		Name: "MediumOrchid1",
	},
	{
		Hex:  "#ff8700",
		Rgb:  Rgb{255, 135, 0},
		Hsl:  Hsl{31.7647058823529, 100, 50},
		Name: "DarkOrange",
	},
	{
		Hex:  "#ff875f",
		Rgb:  Rgb{255, 135, 95},
		Hsl:  Hsl{15, 100, 68},
		Name: "Salmon1",
	},
	{
		Hex:  "#ff8787",
		Rgb:  Rgb{255, 135, 135},
		Hsl:  Hsl{0, 100, 76},
		Name: "LightCoral",
	},
	{
		Hex:  "#ff87af",
		Rgb:  Rgb{255, 135, 175},
		Hsl:  Hsl{340, 100, 76},
		Name: "PaleVioletRed1",
	},
	{
		Hex:  "#ff87d7",
		Rgb:  Rgb{255, 135, 215},
		Hsl:  Hsl{320, 100, 76},
		Name: "Orchid2",
	},
	{
		Hex:  "#ff87ff",
		Rgb:  Rgb{255, 135, 255},
		Hsl:  Hsl{300, 100, 76},
		Name: "Orchid1",
	},
	{
		Hex:  "#ffaf00",
		Rgb:  Rgb{255, 175, 0},
		Hsl:  Hsl{41.1764705882353, 100, 50},
		Name: "Orange1",
	},
	{
		Hex:  "#ffaf5f",
		Rgb:  Rgb{255, 175, 95},
		Hsl:  Hsl{30, 100, 68},
		Name: "SandyBrown",
	},
	{
		Hex:  "#ffaf87",
		Rgb:  Rgb{255, 175, 135},
		Hsl:  Hsl{20, 100, 76},
		Name: "LightSalmon1",
	},
	{
		Hex:  "#ffafaf",
		Rgb:  Rgb{255, 175, 175},
		Hsl:  Hsl{0, 100, 84},
		Name: "LightPink1",
	},
	{
		Hex:  "#ffafd7",
		Rgb:  Rgb{255, 175, 215},
		Hsl:  Hsl{330, 100, 84},
		Name: "Pink1",
	},
	{
		Hex:  "#ffafff",
		Rgb:  Rgb{255, 175, 255},
		Hsl:  Hsl{300, 100, 84},
		Name: "Plum1",
	},
	{
		Hex:  "#ffd700",
		Rgb:  Rgb{255, 215, 0},
		Hsl:  Hsl{50.5882352941176, 100, 50},
		Name: "Gold1",
	},
	{
		Hex:  "#ffd75f",
		Rgb:  Rgb{255, 215, 95},
		Hsl:  Hsl{45, 100, 68},
		Name: "LightGoldenrod2",
	},
	{
		Hex:  "#ffd787",
		Rgb:  Rgb{255, 215, 135},
		Hsl:  Hsl{40, 100, 76},
		Name: "LightGoldenrod2",
	},
	{
		Hex:  "#ffd7af",
		Rgb:  Rgb{255, 215, 175},
		Hsl:  Hsl{30, 100, 84},
		Name: "NavajoWhite1",
	},
	{
		Hex:  "#ffd7d7",
		Rgb:  Rgb{255, 215, 215},
		Hsl:  Hsl{0, 100, 92},
		Name: "MistyRose1",
	},
	{
		Hex:  "#ffd7ff",
		Rgb:  Rgb{255, 215, 255},
		Hsl:  Hsl{300, 100, 92},
		Name: "Thistle1",
	},
	{
		Hex:  "#ffff00",
		Rgb:  Rgb{255, 255, 0},
		Hsl:  Hsl{60, 100, 50},
		Name: "Yellow1",
	},
	{
		Hex:  "#ffff5f",
		Rgb:  Rgb{255, 255, 95},
		Hsl:  Hsl{60, 100, 68},
		Name: "LightGoldenrod1",
	},
	{
		Hex:  "#ffff87",
		Rgb:  Rgb{255, 255, 135},
		Hsl:  Hsl{60, 100, 76},
		Name: "Khaki1",
	},
	{
		Hex:  "#ffffaf",
		Rgb:  Rgb{255, 255, 175},
		Hsl:  Hsl{60, 100, 84},
		Name: "Wheat1",
	},
	{
		Hex:  "#ffffd7",
		Rgb:  Rgb{255, 255, 215},
		Hsl:  Hsl{60, 100, 92},
		Name: "Cornsilk1",
	},
	{
		Hex:  "#ffffff",
		Rgb:  Rgb{255, 255, 255},
		Hsl:  Hsl{0, 0, 100},
		Name: "Grey100",
	},
	{
		Hex:  "#080808",
		Rgb:  Rgb{8, 8, 8},
		Hsl:  Hsl{0, 0, 3},
		Name: "Grey3",
	},
	{
		Hex:  "#121212",
		Rgb:  Rgb{18, 18, 18},
		Hsl:  Hsl{0, 0, 7},
		Name: "Grey7",
	},
	{
		Hex:  "#1c1c1c",
		Rgb:  Rgb{28, 28, 28},
		Hsl:  Hsl{0, 0, 10},
		Name: "Grey11",
	},
	{
		Hex:  "#262626",
		Rgb:  Rgb{38, 38, 38},
		Hsl:  Hsl{0, 0, 14},
		Name: "Grey15",
	},
	{
		Hex:  "#303030",
		Rgb:  Rgb{48, 48, 48},
		Hsl:  Hsl{0, 0, 18},
		Name: "Grey19",
	},
	{
		Hex:  "#3a3a3a",
		Rgb:  Rgb{58, 58, 58},
		Hsl:  Hsl{0, 0, 22},
		Name: "Grey23",
	},
	{
		Hex:  "#444444",
		Rgb:  Rgb{68, 68, 68},
		Hsl:  Hsl{0, 0, 26},
		Name: "Grey27",
	},
	{
		Hex:  "#4e4e4e",
		Rgb:  Rgb{78, 78, 78},
		Hsl:  Hsl{0, 0, 30},
		Name: "Grey30",
	},
	{
		Hex:  "#585858",
		Rgb:  Rgb{88, 88, 88},
		Hsl:  Hsl{0, 0, 34},
		Name: "Grey35",
	},
	{
		Hex:  "#626262",
		Rgb:  Rgb{98, 98, 98},
		Hsl:  Hsl{0, 0, 37},
		Name: "Grey39",
	},
	{
		Hex:  "#6c6c6c",
		Rgb:  Rgb{108, 108, 108},
		Hsl:  Hsl{0, 0, 40},
		Name: "Grey42",
	},
	{
		Hex:  "#767676",
		Rgb:  Rgb{118, 118, 118},
		Hsl:  Hsl{0, 0, 46},
		Name: "Grey46",
	},
	{
		Hex:  "#808080",
		Rgb:  Rgb{128, 128, 128},
		Hsl:  Hsl{0, 0, 50},
		Name: "Grey50",
	},
	{
		Hex:  "#8a8a8a",
		Rgb:  Rgb{138, 138, 138},
		Hsl:  Hsl{0, 0, 54},
		Name: "Grey54",
	},
	{
		Hex:  "#949494",
		Rgb:  Rgb{148, 148, 148},
		Hsl:  Hsl{0, 0, 58},
		Name: "Grey58",
	},
	{
		Hex:  "#9e9e9e",
		Rgb:  Rgb{158, 158, 158},
		Hsl:  Hsl{0, 0, 61},
		Name: "Grey62",
	},
	{
		Hex:  "#a8a8a8",
		Rgb:  Rgb{168, 168, 168},
		Hsl:  Hsl{0, 0, 65},
		Name: "Grey66",
	},
	{
		Hex:  "#b2b2b2",
		Rgb:  Rgb{178, 178, 178},
		Hsl:  Hsl{0, 0, 69},
		Name: "Grey70",
	},
	{
		Hex:  "#bcbcbc",
		Rgb:  Rgb{188, 188, 188},
		Hsl:  Hsl{0, 0, 73},
		Name: "Grey74",
	},
	{
		Hex:  "#c6c6c6",
		Rgb:  Rgb{198, 198, 198},
		Hsl:  Hsl{0, 0, 77},
		Name: "Grey78",
	},
	{
		Hex:  "#d0d0d0",
		Rgb:  Rgb{208, 208, 208},
		Hsl:  Hsl{0, 0, 81},
		Name: "Grey82",
	},
	{
		Hex:  "#dadada",
		Rgb:  Rgb{218, 218, 218},
		Hsl:  Hsl{0, 0, 85},
		Name: "Grey85",
	},
	{
		Hex:  "#e4e4e4",
		Rgb:  Rgb{228, 228, 228},
		Hsl:  Hsl{0, 0, 89},
		Name: "Grey89",
	},
	{
		Hex:  "#eeeeee",
		Rgb:  Rgb{238, 238, 238},
		Hsl:  Hsl{0, 0, 93},
		Name: "Grey93",
	},
}
