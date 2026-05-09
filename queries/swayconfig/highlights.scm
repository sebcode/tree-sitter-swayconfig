; Kommentare
(comment) @comment

; Variablen
(variable_name) @variable
(variable_reference) @variable

; Keywords
"set" @keyword
"bindsym" @keyword.function
"bindcode" @keyword.function
"bindgesture" @keyword.function
"bindswitch" @keyword.function
"exec" @keyword
"exec_always" @keyword
"output" @keyword
"input" @keyword
"seat" @keyword
"mode" @keyword
"bar" @keyword
"for_window" @keyword
"assign" @keyword
"workspace" @keyword
"gaps" @keyword
"focus" @keyword
"floating" @keyword
"include" @keyword
"xwayland" @keyword

; Statement keywords (for statements that are just keyword + value)
"mouse_warping" @keyword
"focus_follows_mouse" @keyword
"focus_wrapping" @keyword
"force_focus_wrapping" @keyword
"focus_on_window_activation" @keyword
"workspace_auto_back_and_forth" @keyword
"show_marks" @keyword
"font" @keyword
"default_border" @keyword
"default_floating_border" @keyword
"hide_edge_borders" @keyword
"smart_borders" @keyword
"smart_gaps" @keyword
"popup_during_fullscreen" @keyword
"titlebar_border_thickness" @keyword
"titlebar_padding" @keyword
"tiling_drag" @keyword
"tiling_drag_threshold" @keyword
"swaybg_command" @keyword
"swaynag_command" @keyword
"primary_selection" @keyword
"floating_minimum_size" @keyword
"floating_maximum_size" @keyword
"floating_modifier" @keyword

; Seat options
"hide_cursor" @keyword
"attach" @keyword
"fallback" @keyword
"idle_inhibit" @keyword
"idle_wake" @keyword
"keyboard_grouping" @keyword
"pointer_constraint" @keyword
"shortcuts_inhibitor" @keyword
"xcursor_theme" @keyword

; Input options
"accel_profile" @keyword
"click_method" @keyword
"drag" @keyword
"drag_lock" @keyword
"dwt" @keyword
"dwtp" @keyword
"events" @keyword
"left_handed" @keyword
"middle_emulation" @keyword
"natural_scroll" @keyword
"pointer_accel" @keyword
"repeat_delay" @keyword
"repeat_rate" @keyword
"scroll_button" @keyword
"scroll_button_lock" @keyword
"scroll_factor" @keyword
"scroll_method" @keyword
"tap" @keyword
"tap_button_map" @keyword
"xkb_layout" @keyword
"xkb_model" @keyword
"xkb_options" @keyword
"xkb_rules" @keyword
"xkb_variant" @keyword
"xkb_file" @keyword
"xkb_capslock" @keyword
"xkb_numlock" @keyword
"map_to_output" @keyword
"map_to_region" @keyword
"map_from_region" @keyword
"calibration_matrix" @keyword
"tool" @keyword

; Client color keywords
"client.focused" @keyword
"client.focused_inactive" @keyword
"client.focused_tab_title" @keyword
"client.unfocused" @keyword
"client.urgent" @keyword
"client.placeholder" @keyword
"client.background" @keyword

; Strings
(string) @string

; Values that look like strings (start with quote)
((value) @string
  (#lua-match? @string "^[\"']"))

; Zahlen
(number) @number

; Farben
(color) @constant

; Key combinations
(key_combo) @constant.builtin

; Commands
(command_string) @string.special
(bar_statement (command_string) @string)

; Criteria properties
(criteria_property) @property

; Identifiers
(identifier) @identifier

; Operators
"=" @operator
"→" @operator

; Delimiters
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket

; Special values
((identifier) @boolean
  (#any-of? @boolean "yes" "no" "on" "off" "enable" "disable" "enabled" "disabled"))

((identifier) @constant.builtin
  (#any-of? @constant.builtin "top" "bottom" "left" "right"
    "normal" "pixel" "none" "smart" "floating" "tiling"
    "output" "container" "always" "smart" "urgent" "focus"
    "ignore" "leave_fullscreen" "force" "workspace" "dock" "hide" "invisible"))
