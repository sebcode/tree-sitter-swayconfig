module.exports = grammar({
  name: 'swayconfig',

  extras: $ => [
    /[ \t]/,
  ],

  conflicts: $ => [
    [$.color, $.comment],
    [$.output_option, $.mode_block]
  ],

  rules: {
    source_file: $ => repeat(choice($._statement, '\n')),

    _statement: $ => choice(
      $.client_color_statement,
      $.output_statement,
      $.comment,
      $.set_statement,
      $.bindkey_statement,
      $.exec_statement,
      $.input_statement,
      $.seat_statement,
      $.workspace_statement,
      $.mode_block,
      $.bar_block,
      $.for_window_statement,
      $.assign_statement,
      $.floating_statement,
      $.floating_modifier_statement,
      $.gaps_statement,
      $.default_border_statement,
      $.focus_statement,
      $.font_statement,
      $.titlebar_statement,
      $.hide_edge_borders_statement,
      $.smart_borders_statement,
      $.smart_gaps_statement,
      $.popup_during_fullscreen_statement,
      $.workspace_auto_back_and_forth_statement,
      $.focus_follows_mouse_statement,
      $.mouse_warping_statement,
      $.focus_wrapping_statement,
      $.focus_on_window_activation_statement,
      $.show_marks_statement,
      $.tiling_drag_statement,
      $.include_statement,
      $.swaybg_command_statement,
      $.swaynag_command_statement,
      $.xwayland_statement,
      $.primary_selection_statement,
      $.generic_command
    ),

    comment: $ => token(prec(-10, /#.*/)),

    set_statement: $ => seq(
      'set',
      field('variable', $.variable_name),
      field('value', $.value)
    ),

    variable_name: $ => /\$[a-zA-Z_][a-zA-Z0-9_]*/,

    variable_reference: $ => /\$[a-zA-Z_][a-zA-Z0-9_]*/,

    bindkey_statement: $ => prec.dynamic(3, prec.right(seq(
      field('command', choice('bindsym', 'bindcode', 'bindswitch', 'bindgesture')),
      optional(field('flags', $.bind_flags)),
      field('key', $.key_combo),
      optional(choice(
        seq(choice('exec', 'exec_always'), optional('--no-startup-id'), field('exec', $.command_string)),
        seq('mode', field('exec', $.command_string)),
        seq(optional('--'), field('exec', $.command_string)),
        $.bind_block
      ))
    ))),

    bind_block: $ => seq(
      '{',
      repeat(choice(
        field('exec', $.command_string),
        '\n'
      )),
      '}'
    ),

    bind_flags: $ => repeat1(choice(
      '--release',
      '--locked',
      '--inhibited',
      '--no-repeat',
      '--border',
      '--contents',
      '--titlebar',
      '--exact',
      '--input-device',
      /--input-device=[^\s]+/,
      '--no-warn',
      '--to-code'
    )),

    key_combo: $ => /[^\s\n]+/,

    bind_command: $ => alias($.command_string, $.command_string),

    exec_statement: $ => prec(-1, seq(
      field('command', choice('exec', 'exec_always')),
      optional('--no-startup-id'),
      choice(
        field('exec', $.command_string),
        $.exec_block
      )
    )),

    exec_block: $ => seq(
      '{',
      repeat(choice(
        field('exec', $.command_string),
        '\n'
      )),
      '}'
    ),

    output_statement: $ => prec.dynamic(2, prec.right(seq(
      'output',
      field('output', choice($.identifier, $.variable_reference)),
      choice(
        repeat(field('option', $.output_option)),
        seq('{', repeat(choice($.output_option, '\n')), '}')
      )
    ))),

    output_option: $ => prec.right(choice(
      seq('mode', $.value),
      seq('position', $.value, optional($.value)),
      seq('scale', $.value),
      seq('scale_filter', $.value),
      seq('transform', $.value),
      seq('background', $.value, $.value),
      seq('bg', $.value, $.value),
      seq('resolution', $.value),
      seq('res', $.value),
      'disable',
      'enable',
      'toggle',
      seq('dpms', $.value),
      seq('adaptive_sync', $.value),
      seq('render_bit_depth', $.value),
      seq('max_render_time', $.value),
      seq('allow_tearing', $.value)
    )),

    input_statement: $ => prec.left(seq(
      'input',
      field('device', choice($.identifier, $.string)),
      choice(
        repeat(field('option', $.input_option)),
        seq('{', repeat(choice($.input_option, '\n')), '}')
      )
    )),

    input_option: $ => prec.left(seq(
      choice(
        'accel_profile',
        'click_method',
        'drag',
        'drag_lock',
        'dwt',
        'dwtp',
        'events',
        'left_handed',
        'middle_emulation',
        'natural_scroll',
        'pointer_accel',
        'repeat_delay',
        'repeat_rate',
        'scroll_button',
        'scroll_button_lock',
        'scroll_factor',
        'scroll_method',
        'tap',
        'tap_button_map',
        'xkb_layout',
        'xkb_model',
        'xkb_options',
        'xkb_rules',
        'xkb_variant',
        'xkb_file',
        'xkb_capslock',
        'xkb_numlock',
        'map_to_output',
        'map_to_region',
        'map_from_region',
        'calibration_matrix',
        'tool'
      ),
      repeat($.value)
    )),

    seat_statement: $ => prec.left(seq(
      'seat',
      field('seat', choice($.identifier, $.variable_reference)),
      choice(
        repeat(field('option', $.seat_option)),
        seq('{', repeat(choice($.seat_option, '\n')), '}')
      )
    )),

    seat_option: $ => prec.left(seq(
      choice(
        'attach',
        'fallback',
        'hide_cursor',
        'idle_inhibit',
        'idle_wake',
        'keyboard_grouping',
        'pointer_constraint',
        'shortcuts_inhibitor',
        'xcursor_theme'
      ),
      repeat($.value)
    )),

    workspace_statement: $ => prec.dynamic(2, prec.right(seq(
      'workspace',
      field('workspace', $.value),
      optional(seq('output', choice($.identifier, $.variable_reference))),
      optional(seq('gaps', choice('inner', 'outer', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left'), $.value))
    ))),

    mode_block: $ => prec(1, seq(
      'mode',
      field('mode_name', choice($.string, $.identifier)),
      '{',
      repeat(choice($._statement, '\n')),
      '}'
    )),

    bar_block: $ => seq(
      'bar',
      optional($.identifier),
      '{',
      repeat(choice($.bar_statement, '\n')),
      '}'
    ),

    bar_statement: $ => choice(
      seq('status_command', $.command_string),
      seq('position', choice('top', 'bottom')),
      seq('mode', choice('dock', 'hide', 'invisible')),
      seq('hidden_state', choice('hide', 'show')),
      seq('id', $.identifier),
      seq('modifier', $.value),
      seq('output', $.identifier),
      seq('tray_output', choice('none', $.identifier)),
      seq('tray_padding', $.value, optional($.value)),
      seq('separator_symbol', $.string),
      seq('workspace_buttons', choice('yes', 'no')),
      seq('workspace_min_width', $.value),
      seq('strip_workspace_numbers', choice('yes', 'no')),
      seq('strip_workspace_name', choice('yes', 'no')),
      seq('binding_mode_indicator', choice('yes', 'no')),
      seq('font', $.value),
      seq('height', $.value),
      seq('gaps', repeat($.value)),
      seq('pango_markup', choice('enabled', 'disabled')),
      seq('swaybar_command', $.command_string),
      seq('status_edge_padding', $.value),
      seq('status_padding', $.value),
      seq('icon_theme', $.value),
      $.bar_colors_block,
      $.bindkey_statement,
      $.comment
    ),

    bar_colors_block: $ => seq(
      'colors',
      '{',
      repeat(choice($.bar_color_statement, '\n')),
      '}'
    ),

    bar_color_statement: $ => choice(
      seq('background', $.color),
      seq('statusline', $.color),
      seq('separator', $.color),
      seq('focused_background', $.color),
      seq('focused_statusline', $.color),
      seq('focused_separator', $.color),
      seq('focused_workspace', $.color, $.color, optional($.color)),
      seq('active_workspace', $.color, $.color, optional($.color)),
      seq('inactive_workspace', $.color, $.color, optional($.color)),
      seq('urgent_workspace', $.color, $.color, optional($.color)),
      seq('binding_mode', $.color, $.color, optional($.color)),
      $.comment
    ),

    for_window_statement: $ => seq(
      'for_window',
      field('criteria', $.criteria),
      field('command', $.command_string)
    ),

    assign_statement: $ => seq(
      'assign',
      field('criteria', $.criteria),
      optional('→'),
      optional('--'),
      choice(
        seq('output', $.identifier),
        seq('workspace', choice('number', $.value)),
        $.value
      )
    ),

    criteria: $ => prec.right(seq(
      '[',
      repeat1(seq(
        field('property', $.criteria_property),
        '=',
        field('value', choice($.string, $.criteria_value))
      )),
      ']'
    )),

    criteria_value: $ => /[^\s\]"']+/,

    criteria_property: $ => choice(
      'app_id',
      'class',
      'con_id',
      'con_mark',
      'floating',
      'id',
      'instance',
      'pid',
      'shell',
      'tiling',
      'title',
      'urgent',
      'window_role',
      'window_type',
      'workspace'
    ),

    floating_statement: $ => seq(
      choice(
        'floating_minimum_size',
        'floating_maximum_size'
      ),
      $.value,
      'x',
      $.value
    ),

    floating_modifier_statement: $ => seq(
      'floating_modifier',
      $.value,
      optional(choice('normal', 'inverse'))
    ),

    gaps_statement: $ => seq(
      'gaps',
      choice('inner', 'outer', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left'),
      optional(choice('current', 'all', 'workspace', 'current')),
      choice('set', 'plus', 'minus', 'toggle', $.value)
    ),

    default_border_statement: $ => prec.left(seq(
      choice('default_border', 'default_floating_border'),
      choice('normal', 'pixel', 'none'),
      optional($.value)
    )),

    focus_statement: $ => prec.left(seq(
      'focus',
      choice(
        'left', 'right', 'up', 'down',
        'parent', 'child', 'prev', 'next',
        'floating', 'tiling', 'mode_toggle',
        seq('output', optional(choice('left', 'right', 'up', 'down', $.identifier)))
      )
    )),

    font_statement: $ => seq(
      'font',
      $.value
    ),

    titlebar_statement: $ => prec.left(seq(
      choice('titlebar_border_thickness', 'titlebar_padding'),
      $.value,
      optional($.value)
    )),

    client_color_statement: $ => prec.right(seq(
      choice(
        'client.focused',
        'client.focused_inactive',
        'client.focused_tab_title',
        'client.unfocused',
        'client.urgent',
        'client.placeholder',
        'client.background'
      ),
      repeat1(choice($.color, $.variable_reference))
    )),

    hide_edge_borders_statement: $ => seq(
      'hide_edge_borders',
      choice('none', 'vertical', 'horizontal', 'both', 'smart', 'smart_no_gaps')
    ),

    smart_borders_statement: $ => seq(
      'smart_borders',
      choice('on', 'off', 'no_gaps')
    ),

    smart_gaps_statement: $ => seq(
      'smart_gaps',
      choice('on', 'off', 'toggle', 'inverse_outer')
    ),

    popup_during_fullscreen_statement: $ => seq(
      'popup_during_fullscreen',
      choice('smart', 'ignore', 'leave_fullscreen')
    ),

    workspace_auto_back_and_forth_statement: $ => seq(
      'workspace_auto_back_and_forth',
      choice('yes', 'no')
    ),

    focus_follows_mouse_statement: $ => seq(
      'focus_follows_mouse',
      choice('yes', 'no', 'always')
    ),

    mouse_warping_statement: $ => seq(
      'mouse_warping',
      choice('output', 'container', 'none')
    ),

    focus_wrapping_statement: $ => seq(
      choice('focus_wrapping', 'force_focus_wrapping'),
      choice('yes', 'no', 'force', 'workspace')
    ),

    focus_on_window_activation_statement: $ => seq(
      'focus_on_window_activation',
      choice('smart', 'urgent', 'focus', 'none')
    ),

    show_marks_statement: $ => seq(
      'show_marks',
      choice('yes', 'no')
    ),

    tiling_drag_statement: $ => seq(
      choice('tiling_drag', 'tiling_drag_threshold'),
      $.value
    ),

    include_statement: $ => seq(
      'include',
      $.value
    ),

    swaybg_command_statement: $ => seq(
      'swaybg_command',
      $.command_string
    ),

    swaynag_command_statement: $ => seq(
      'swaynag_command',
      $.command_string
    ),

    xwayland_statement: $ => seq(
      'xwayland',
      choice('enable', 'disable', 'force')
    ),

    primary_selection_statement: $ => seq(
      'primary_selection',
      choice('enabled', 'disabled')
    ),

    generic_command: $ => prec.right(seq(
      field('command', $.identifier),
      repeat(field('args', $.value))
    )),

    command_string: $ => choice(
      $.string,
      prec.right(repeat1(choice(
        $.variable_reference,
        /[^\s"'#\n$]+/,
        /\$[^a-zA-Z_\s"'#\n]/
      )))
    ),

    color: $ => token(choice(
      /#[0-9a-fA-F]{6}/,
      /#[0-9a-fA-F]{8}/,
      /#[0-9a-fA-F]{3}/
    )),

    string: $ => choice(
      seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\]/, /\\./)), "'")
    ),

    identifier: $ => /[a-zA-Z_*][a-zA-Z0-9_\-*]*/,

    value: $ => choice(
      $.string,
      $.variable_reference,
      /[0-9]+x[0-9]+/,
      /[0-9]+,[0-9]+/,
      $.number,
      $.identifier,
      /[^\s#\n{}\[\]0-9\-][^\s#\n{}\[\]]*/
    ),

    number: $ => /-?[0-9]+(\.[0-9]+)?/,
  }
});
