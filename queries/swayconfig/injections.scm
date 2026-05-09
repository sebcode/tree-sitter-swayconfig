; Inject bash syntax into exec commands
(exec_statement
  exec: (command_string) @injection.content
  (#set! injection.language "bash")
  (#set! injection.include-children))

; Inject bash into exec blocks (each command)
(exec_block
  exec: (command_string) @injection.content
  (#set! injection.language "bash")
  (#set! injection.include-children))

; Inject bash into bindkey exec commands
(bindkey_statement
  exec: (command_string) @injection.content
  (#set! injection.language "bash")
  (#set! injection.include-children))

; Inject bash into bindkey blocks (each command)
(bind_block
  exec: (command_string) @injection.content
  (#set! injection.language "bash")
  (#set! injection.include-children))

; Inject bash into bar swaybar_command
(bar_statement
  (command_string) @injection.content
  (#set! injection.language "bash")
  (#set! injection.include-children))
