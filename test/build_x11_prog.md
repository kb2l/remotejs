gcc get_click_event.c $(pkg-config --cflags --libs x11) -o prog
gcc xreadkeys.c $(pkg-config --cflags --libs x11) -o prog
