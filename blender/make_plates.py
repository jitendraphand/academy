"""Salon Academy — Blender reference plates.
Procedural salon tool models + studio lighting, rendered headless (EEVEE).
Run:  blender -b --python blender/make_plates.py
Out:  public/img/plates/<name>.png  (960x540)
"""
import bpy
import os
import math

OUT = os.path.join(os.getcwd(), 'public', 'img', 'plates')
os.makedirs(OUT, exist_ok=True)
MAT_CACHE = {}


def mat(name, color, metallic=0.0, roughness=0.5, emission=None, e_strength=0.0):
    if name in MAT_CACHE:
        return MAT_CACHE[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*color, 1.0)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    if emission is not None:
        bsdf.inputs['Emission Color'].default_value = (*emission, 1.0)
        bsdf.inputs['Emission Strength'].default_value = e_strength
    MAT_CACHE[name] = m
    return m


def clear_all():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    MAT_CACHE.clear()


def prim(kind, name, material, loc, scale=None, rot=None):
    if kind == 'cube':
        bpy.ops.mesh.primitive_cube_add(size=2, location=loc)
    elif kind == 'cyl':
        bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=2, location=loc)
    elif kind == 'sph':
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=loc)
    elif kind == 'cone':
        bpy.ops.mesh.primitive_cone_add(radius1=1, depth=2, location=loc)
    elif kind == 'torus':
        bpy.ops.mesh.primitive_torus_add(major_radius=1, minor_radius=0.25, location=loc)
    elif kind == 'plane':
        bpy.ops.mesh.primitive_plane_add(size=2, location=loc)
    o = bpy.context.active_object
    o.name = name
    if o.type == 'MESH':
        for p in o.data.polygons:
            p.use_smooth = True
    if scale:
        o.scale = scale
    if rot:
        o.rotation_euler = rot
    if material:
        o.data.materials.append(material)
    return o


def studio():
    sc = bpy.context.scene
    try:
        sc.render.engine = 'BLENDER_EEVEE_NEXT'
    except Exception:
        sc.render.engine = 'BLENDER_EEVEE'
    sc.render.resolution_x = 960
    sc.render.resolution_y = 540
    sc.render.resolution_percentage = 100
    sc.render.film_transparent = False
    sc.eevee.taa_render_samples = 96
    try:
        sc.eevee.use_gtao = True
        sc.eevee.gtao_distance = 0.6
    except Exception:
        pass
    world = bpy.data.worlds['World']
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (0.93, 0.91, 0.86, 1.0)
    bg.inputs['Strength'].default_value = 0.55
    # camera
    bpy.ops.object.camera_add(location=(4.6, -5.6, 3.4))
    cam = bpy.context.active_object
    cam.data.lens = 50
    sc.camera = cam
    track = cam.constraints.new('TRACK_TO')
    track.target = prim('cube', 'focus', None, (0, 0, 0.6))
    track.track_axis = 'TRACK_NEGATIVE_Z'
    track.up_axis = 'UP_Y'
    track.target.hide_render = True
    # ground
    prim('plane', 'ground', mat('gnd', (0.8, 0.77, 0.71), 0, 0.95), (0, 0, 0), scale=(9, 9, 1))
    # key / fill / rim area lights
    for i, (loc, e) in enumerate([((4, -3, 6), 450), ((-4, -2, 4), 180), ((0, 5, 4), 260)]):
        bpy.ops.object.light_add(type='AREA', location=loc)
        li = bpy.context.active_object
        li.name = f'studio_{i}'
        li.data.energy = e
        li.data.size = 3.0


# ---------------- plate builders ----------------
def b_shears():
    steel = mat('steel', (0.78, 0.8, 0.84), 0.9, 0.25)
    accent = mat('acc', (0.35, 0.2, 0.75), 0.2, 0.5)
    prim('cube', 'blade1', steel, (-0.3, 0, 0.8), scale=(1.1, 0.045, 0.09), rot=(0, 0, 0.35))
    prim('cube', 'blade2', steel, (-0.3, 0, 0.8), scale=(1.1, 0.045, 0.09), rot=(0, 0, -0.35))
    prim('cyl', 'pivot', mat('gold', (0.7, 0.45, 0.15), 0.9, 0.3), (-0.3, 0, 0.8), scale=(0.09, 0.09, 0.09))
    prim('torus', 'ring1', accent, (0.85, 0.35, 0.75), scale=(0.16, 0.16, 0.16))
    prim('torus', 'ring2', accent, (0.85, -0.35, 0.75), scale=(0.16, 0.16, 0.16))
    prim('cube', 'comb', mat('comb', (0.1, 0.45, 0.42), 0, 0.5), (0.4, 1.1, 0.55), scale=(0.7, 0.06, 0.1))
    for i in range(9):
        prim('cube', f'tooth{i}', mat('comb', (0.1, 0.45, 0.42), 0, 0.5), (-0.15 + i * 0.14, 1.1, 0.42), scale=(0.03, 0.05, 0.12))


def b_heat():
    body = mat('dry', (0.12, 0.15, 0.2), 0.1, 0.4)
    prim('cyl', 'dryer', body, (-1.2, 0, 1.0), scale=(0.32, 0.32, 0.7), rot=(0, 1.2, 0))
    prim('cone', 'nozzle', mat('noz', (0.45, 0.25, 0.7), 0.2, 0.4), (-0.35, 0.15, 0.85), scale=(0.3, 0.3, 0.35), rot=(0, -1.2, 0))
    prim('cube', 'handle', body, (-1.7, -0.35, 0.55), scale=(0.14, 0.14, 0.5), rot=(0.3, 0, 0))
    prim('cyl', 'brush', mat('wood', (0.7, 0.45, 0.2), 0, 0.6), (0.5, -0.3, 0.55), scale=(0.16, 0.16, 0.6), rot=(1.57, 0, 0))
    prim('cube', 'grip', body, (0.5, -0.3, -0.15), scale=(0.08, 0.08, 0.3))
    plate = mat('plate', (0.15, 0.15, 0.18), 0.8, 0.3)
    prim('cube', 'ironA', plate, (1.5, 0.4, 0.75), scale=(0.3, 0.09, 0.65))
    prim('cube', 'ironB', plate, (1.5, 0.4, 0.5), scale=(0.3, 0.09, 0.65))
    prim('cube', 'irglow', mat('ir', (1.0, 0.35, 0.1), 0, 0.5, emission=(1.0, 0.3, 0.08), e_strength=2.5), (1.5, 0.4, 0.63), scale=(0.26, 0.02, 0.6))


def b_colour():
    prim('cyl', 'bowl', mat('bowl', (0.35, 0.15, 0.6), 0.1, 0.4), (-0.9, 0, 0.35), scale=(0.5, 0.5, 0.3))
    prim('cyl', 'mix', mat('mix', (0.75, 0.3, 0.1), 0, 0.6), (-0.9, 0, 0.5), scale=(0.42, 0.42, 0.12))
    prim('cyl', 'brushh', mat('wood', (0.7, 0.45, 0.2), 0, 0.6), (-0.35, 0.35, 0.62), scale=(0.05, 0.05, 0.5), rot=(0.9, 0, 0.4))
    prim('cube', 'bristle', mat('br', (0.2, 0.1, 0.4), 0, 0.7), (-0.55, 0.15, 0.42), scale=(0.12, 0.06, 0.1))
    for i in range(4):
        prim('cube', f'foil{i}', mat('foil', (0.82, 0.84, 0.88), 0.95, 0.2), (0.7 + (i % 2) * 0.35, -0.5 + (i // 2) * 0.4, 0.12 + i * 0.035), scale=(0.3, 0.22, 0.015))
    prim('cyl', 'dev', mat('dev', (0.5, 0.3, 0.7), 0, 0.5), (-0.2, -1.0, 0.5), scale=(0.22, 0.22, 0.5))
    prim('cyl', 'devcap', mat('cap', (0.12, 0.12, 0.14), 0, 0.5), (-0.2, -1.0, 1.1), scale=(0.1, 0.1, 0.12))
    prim('cube', 'scale', mat('sc', (0.6, 0.62, 0.65), 0.4, 0.4), (1.2, -0.9, 0.12), scale=(0.45, 0.35, 0.12))
    prim('cube', 'disp', mat('dsp', (0.1, 0.5, 0.45), 0, 0.4, emission=(0.1, 0.6, 0.55), e_strength=1.2), (1.2, -0.9, 0.3), scale=(0.25, 0.2, 0.03))


def b_basin():
    prim('torus', 'rim', mat('cer', (0.95, 0.92, 0.86), 0, 0.3), (0, 0, 0.9), scale=(0.9, 0.9, 0.9))
    prim('cyl', 'cup', mat('cer', (0.95, 0.92, 0.86), 0, 0.3), (0, 0, 0.45), scale=(0.7, 0.7, 0.45))
    prim('cube', 'neck', mat('teal', (0.06, 0.46, 0.43), 0, 0.5), (0, 1.0, 0.95), scale=(0.3, 0.12, 0.1))
    prim('cyl', 'sh1', mat('amb', (0.98, 0.75, 0.25), 0, 0.4), (-1.4, 0.6, 0.5), scale=(0.2, 0.2, 0.5))
    prim('cyl', 'sh2', mat('aqua', (0.18, 0.74, 0.75), 0, 0.4), (-1.4, -0.1, 0.5), scale=(0.2, 0.2, 0.5))
    prim('cube', 'tow1', mat('tow', (1, 1, 1), 0, 0.9), (1.4, 0.5, 0.18), scale=(0.4, 0.35, 0.16))
    prim('cube', 'tow2', mat('tow', (0.85, 0.92, 0.95), 0, 0.9), (1.4, 0.5, 0.5), scale=(0.36, 0.31, 0.15))


def b_facial():
    prim('cyl', 'stbase', mat('eq', (0.9, 0.89, 0.86), 0.1, 0.4), (-1.3, 0, 0.4), scale=(0.32, 0.32, 0.4))
    prim('cyl', 'starm', mat('eq', (0.6, 0.62, 0.65), 0.4, 0.4), (-0.8, 0, 1.1), scale=(0.07, 0.07, 0.6), rot=(0, 0.9, 0))
    prim('cone', 'stnoz', mat('eq', (0.6, 0.62, 0.65), 0.4, 0.4), (-0.25, 0, 1.25), scale=(0.16, 0.16, 0.25), rot=(0, -1.1, 0))
    prim('cyl', 'bowl', mat('pink', (0.95, 0.65, 0.75), 0, 0.5), (0.6, 0.5, 0.2), scale=(0.32, 0.32, 0.2))
    prim('cube', 'spat', mat('wood', (0.8, 0.6, 0.35), 0, 0.6), (0.6, 0.15, 0.35), scale=(0.22, 0.04, 0.04), rot=(0, 0, 0.2))
    prim('torus', 'band', mat('rose', (0.88, 0.15, 0.3), 0, 0.5), (1.3, -0.4, 0.35), scale=(0.22, 0.22, 0.22))
    prim('cube', 't1', mat('tow', (1, 1, 1), 0, 0.9), (0.1, -1.0, 0.15), scale=(0.4, 0.3, 0.14))
    prim('cube', 't2', mat('tow', (1, 1, 1), 0, 0.9), (0.1, -1.0, 0.42), scale=(0.36, 0.27, 0.13))


def b_devices():
    prim('cube', 'hfbase', mat('eq', (0.9, 0.89, 0.86), 0.1, 0.4), (-1.2, 0, 0.3), scale=(0.4, 0.35, 0.3))
    prim('cyl', 'hfrod', mat('steel', (0.6, 0.62, 0.65), 0.6, 0.35), (-1.2, 0, 0.85), scale=(0.045, 0.045, 0.35))
    prim('sph', 'hftip', mat('vio', (0.55, 0.35, 0.95), 0, 0.3, emission=(0.5, 0.3, 1.0), e_strength=2.0), (-1.2, 0, 1.2), scale=(0.13, 0.13, 0.16))
    prim('sph', 'mask', mat('mblk', (0.12, 0.13, 0.17), 0.2, 0.4), (0.2, 0, 0.7), scale=(0.55, 0.28, 0.62))
    prim('sph', 'mglow', mat('red', (0.9, 0.1, 0.15), 0, 0.4, emission=(1.0, 0.12, 0.15), e_strength=1.6), (0.2, 0.02, 0.7), scale=(0.5, 0.24, 0.57))
    prim('cyl', 'mc1', mat('teal', (0.06, 0.46, 0.43), 0.1, 0.4), (1.25, 0.25, 0.55), scale=(0.07, 0.07, 0.5), rot=(0.3, 0, 0.35))
    prim('cyl', 'mc2', mat('teal', (0.06, 0.46, 0.43), 0.1, 0.4), (1.55, -0.15, 0.55), scale=(0.07, 0.07, 0.5), rot=(0.3, 0, -0.35))
    prim('sph', 'mcball1', mat('steel', (0.7, 0.72, 0.75), 0.8, 0.3), (1.1, 0.4, 0.85), scale=(0.09, 0.09, 0.09))
    prim('sph', 'mcball2', mat('steel', (0.7, 0.72, 0.75), 0.8, 0.3), (1.7, 0.0, 0.85), scale=(0.09, 0.09, 0.09))


def b_chembench():
    glass = mat('glass', (0.65, 0.85, 0.9), 0, 0.1)
    prim('cyl', 'beak', glass, (-0.9, 0, 0.55), scale=(0.4, 0.4, 0.55))
    prim('cyl', 'liq', mat('liq', (0.2, 0.6, 0.85), 0, 0.3), (-0.9, 0, 0.35), scale=(0.36, 0.36, 0.3))
    for i, col in enumerate([(0.9, 0.2, 0.2), (0.95, 0.6, 0.1), (0.95, 0.9, 0.2), (0.3, 0.7, 0.3), (0.2, 0.5, 0.8)]):
        prim('cube', f'ph{i}', mat(f'ph{i}', col, 0, 0.6), (-0.1 + i * 0.22, 0.6, 0.1), scale=(0.09, 0.05, 0.16))
    prim('cyl', 'jar', mat('jar', (0.95, 0.93, 0.88), 0, 0.4), (1.1, 0.4, 0.35), scale=(0.3, 0.3, 0.35))
    prim('cyl', 'jarlid', mat('cap', (0.12, 0.12, 0.14), 0, 0.5), (1.1, 0.4, 0.75), scale=(0.31, 0.31, 0.08))
    prim('cube', 'glo1', mat('glo', (0.25, 0.65, 0.9), 0, 0.6), (0.3, -0.9, 0.06), scale=(0.28, 0.2, 0.05))
    prim('cube', 'glo2', mat('glo', (0.25, 0.65, 0.9), 0, 0.6), (0.85, -0.9, 0.06), scale=(0.28, 0.2, 0.05))
    prim('cyl', 'fan', mat('fan', (0.6, 0.62, 0.65), 0.4, 0.4), (1.5, -0.7, 0.7), scale=(0.3, 0.3, 0.1), rot=(1.2, 0, 0))


def b_rods():
    for i, col in enumerate([(0.88, 0.15, 0.3), (0.5, 0.3, 0.7), (0.06, 0.46, 0.43), (0.95, 0.6, 0.1)]):
        prim('cyl', f'rod{i}', mat(f'rod{i}', col, 0, 0.5), (-0.9 + i * 0.55, 0, 0.35), scale=(0.14, 0.14, 0.55), rot=(0, 0.15 * i, 0))
        prim('cyl', f'band{i}', mat('elastic', (0.15, 0.15, 0.17), 0, 0.6), (-0.9 + i * 0.55, 0.02, 0.62), scale=(0.15, 0.15, 0.05))
    for i in range(5):
        prim('cube', f'paper{i}', mat('paper', (1, 1, 1), 0, 0.9), (0.2 + i * 0.12, -1.0, 0.1 + i * 0.015), scale=(0.22, 0.16, 0.008), rot=(0, 0, 0.15))
    prim('cube', 'tail', mat('comb', (0.1, 0.45, 0.42), 0, 0.5), (1.3, -0.8, 0.4), scale=(0.5, 0.05, 0.08))
    prim('cyl', 'tailp', mat('comb', (0.1, 0.45, 0.42), 0, 0.5), (1.62, -0.8, 0.4), scale=(0.02, 0.02, 0.4), rot=(0, 1.57, 0))


def b_desk():
    prim('torus', 'ring', mat('ring', (1, 0.97, 0.93), 0, 0.4, emission=(1.0, 0.95, 0.88), e_strength=1.8), (-0.8, 0, 1.1), scale=(0.55, 0.55, 0.55))
    prim('cyl', 'stand', mat('blk', (0.15, 0.15, 0.17), 0.2, 0.5), (-0.8, 0, 0.35), scale=(0.06, 0.06, 0.7))
    prim('cube', 'cam', mat('blk', (0.15, 0.15, 0.17), 0.2, 0.5), (0.3, -0.5, 0.45), scale=(0.3, 0.2, 0.22))
    prim('cyl', 'lens', mat('lglass', (0.1, 0.2, 0.3), 0.6, 0.15), (0.3, -0.2, 0.45), scale=(0.12, 0.12, 0.15), rot=(1.57, 0, 0))
    prim('cyl', 'r1', mat('r1', (0.2, 0.6, 0.85), 0, 0.4), (1.1, -0.3, 0.4), scale=(0.14, 0.14, 0.4))
    prim('cyl', 'r2', mat('r2', (0.5, 0.3, 0.7), 0, 0.4), (1.45, -0.3, 0.4), scale=(0.14, 0.14, 0.4))
    prim('cyl', 'r3', mat('r3', (0.95, 0.65, 0.2), 0, 0.4), (1.8, -0.3, 0.4), scale=(0.14, 0.14, 0.4))


PLATES = {
    'shears': b_shears, 'heat': b_heat, 'colour': b_colour,
    'basin': b_basin, 'facial': b_facial, 'devices': b_devices,
    'chembench': b_chembench, 'rods': b_rods, 'desk': b_desk,
}


def main():
    for name, build in PLATES.items():
        clear_all()
        studio()
        build()
        bpy.context.scene.render.filepath = os.path.join(OUT, name + '.png')
        bpy.ops.render.render(write_still=True)
        print(f'PLATE DONE: {name}.png')


main()
