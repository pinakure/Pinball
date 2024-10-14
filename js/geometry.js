const Geometry = [
    new Polygon(43, 215,[255,0,0],[ new Vertex(-2, 48),new Vertex(-12, 48),new Vertex(-27, 33),new Vertex(-27, -61),new Vertex(-25, -63),new Vertex(-11, -63),new Vertex(5, -47),new Vertex(36, 16),new Vertex(36, 17),new Vertex(28, 33),new Vertex(17, 38), ], 'flipperramp_left'),
    new Polygon(167, 210,[255,0,0],[ new Vertex(-20, 43),new Vertex(-31, 38),new Vertex(-39, 22),new Vertex(-39, 21),new Vertex(-8, -42),new Vertex(8, -58),new Vertex(22, -58),new Vertex(24, -56),new Vertex(24, 38),new Vertex(9, 53),new Vertex(-1, 53), ], 'flipperramp_r'),
    new Polygon(235, 171,[255,0,0],[ new Vertex(-3, 148),new Vertex(-3, -147),new Vertex(4, -147),new Vertex(4, 148), ], 'ramp_r'),
    new Polygon(232, 6,[255,0,0],[ new Vertex(0, 18),new Vertex(-2, 13),new Vertex(-5, 5),new Vertex(-11, -1),new Vertex(-15, -3),new Vertex(-21, -5),new Vertex(-21, -6),new Vertex(7, -6),new Vertex(7, 18), ], 'ramp_tr'),
    new Polygon(185, 6,[255,0,0],[ new Vertex(-9, 9),new Vertex(-9, -6),new Vertex(19, -6),new Vertex(19, -5),new Vertex(13, -3),new Vertex(9, -1),new Vertex(3, 5),new Vertex(1, 9), ], 'ramp_tl'),
    new Polygon(7, 6,[255,0,0],[ new Vertex(-7, 18),new Vertex(-7, -6),new Vertex(21, -6),new Vertex(21, -5),new Vertex(15, -3),new Vertex(11, -1),new Vertex(5, 5),new Vertex(2, 13),new Vertex(0, 18), ], 'ramp_tr'),
    new Polygon(47, 6,[255,0,0],[ new Vertex(-3, 5),new Vertex(-9, -1),new Vertex(-13, -3),new Vertex(-19, -5),new Vertex(-19, -6),new Vertex(9, -6),new Vertex(9, 5), ], 'ramp_tl'),
    new Polygon(211, 1,[255,0,0],[ new Vertex(0, 0),new Vertex(-7, 0),new Vertex(-7, -1),new Vertex(0, -1), ], 'ramp_tt'),
    new Polygon(207, 15,[255,0,0],[ new Vertex(-11, -3),new Vertex(-6, -6),new Vertex(2, -7),new Vertex(6, -6),new Vertex(11, -4),new Vertex(15, 1),new Vertex(16, 5),new Vertex(-15, 5), ], 'launchramp_dome'),
    new Polygon(123, 7,[255,0,0],[ new Vertex(-53, 8),new Vertex(-53, -7),new Vertex(54, -7),new Vertex(54, 8), ], 'top_wall'),
    new Polygon(209, 62,[255,0,0],[ new Vertex(14, -42),new Vertex(14, 44),new Vertex(-17, 44),new Vertex(-17, -42), ], 'center_wall_top'),
    new Polygon(3, 145,[255,0,0],[ new Vertex(-3, -122),new Vertex(4, -122),new Vertex(4, 121),new Vertex(-3, 121), ], 'left_wall'),
    new Polygon(29, 300,[255,0,0],[ new Vertex(-22, -34),new Vertex(38, -3),new Vertex(41, 0),new Vertex(42, 3),new Vertex(42, 5),new Vertex(35, 19),new Vertex(-29, 19),new Vertex(-29, -34), ], 'underflipper_left'),
    new Polygon(186, 298,[255,0,0],[ new Vertex(-43, 21),new Vertex(-50, 7),new Vertex(-50, 4),new Vertex(-48, 1),new Vertex(-46, -1),new Vertex(15, -31),new Vertex(37, -31),new Vertex(37, 21), ], 'underflipper_right'),
    new Polygon(211, 191,[255,0,0],[ new Vertex(-11, 76),new Vertex(-11, -77),new Vertex(12, -77),new Vertex(12, 76), ], 'center_wall'),
    new Polygon(208, 110,[255,0,0],[ new Vertex(-8, 4),new Vertex(-8, 4),new Vertex(-11, -3),new Vertex(15, -3),new Vertex(15, 4), ], 'center_wall_middle'),
    new Polygon(62, 6,[255,0,0],[ new Vertex(-6, -6),new Vertex(8, -6),new Vertex(8, 9),new Vertex(-6, 5), ], 'new poly'),
];

const Bumpers = [
    new Polygon(39, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_1'),
    new Polygon(71, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_2'),
    new Polygon(103, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_3'),
    new Polygon(135, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_4'),
    new Polygon(23, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_5'),
    new Polygon(55, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_6'),
    new Polygon(87, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_7'),
    new Polygon(119, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_8'),
    new Polygon(151, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_9'),
];

const Flippers = {
    left    : new Polygon(64, 264, [255, 0, 0], [new Vertex(-8, 1), new Vertex(-8, -3), new Vertex(-7, -5), new Vertex(-5, -7), new Vertex(-3, -8), new Vertex(3, -8), new Vertex(30, 9), new Vertex(31, 10), new Vertex(31, 13), new Vertex(29, 15), new Vertex(25, 15), new Vertex(-5, 6), new Vertex(-7, 4),], 'left_flipper'),
    right   : new Polygon(144, 263,[255,0,0],[ new Vertex(6, 5), new Vertex(4, 7),new Vertex(-26, 16),new Vertex(-30, 16),new Vertex(-32, 14),new Vertex(-32, 11),new Vertex(-31, 10),new Vertex(-4, -7),new Vertex(2, -7),new Vertex(4, -6),new Vertex(6, -4),new Vertex(7, -2),new Vertex(7, 2),], 'right_flipper'),
};