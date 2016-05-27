#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <X11/Xlib.h>
#include <X11/Xutil.h>

int main()
{
    Display* display;
    int screen_num;
    Screen *screen;
    Window root_win;
    XEvent report;
    XButtonEvent *xb = (XButtonEvent *)&report;
    int i;
    Cursor cursor;
    display = XOpenDisplay(0);
    if (display == NULL){
        perror("Cannot connect to X server");
        exit (-1);
    }
    screen_num = DefaultScreen(display);
    screen = XScreenOfDisplay(display, screen_num);
    root_win = RootWindow(display, XScreenNumberOfScreen(screen));
    //cursor = XCreateFontCursor(display, XC_crosshair);
    i = XGrabPointer(display, root_win, False,
                ButtonReleaseMask | ButtonPressMask|Button1MotionMask, GrabModeSync,
                GrabModeAsync, root_win, None, CurrentTime);
    if(i != GrabSuccess)
    {
        perror("Can't grab the mouse");
        exit(-1);
    }

    while(1)
    {
        XAllowEvents(display, SyncPointer, CurrentTime);
        XWindowEvent(display, root_win, ButtonPressMask | ButtonReleaseMask, &report);
        switch(report.type){
            case ButtonPress:
                printf("Press @ (%d, %d)\n", xb->x_root, xb->y_root);
            break;
            case ButtonRelease:
                printf("Release @ (%d, %d)\n", xb->x_root, xb->y_root);
            break;
        }
    }
    XFlush(display);
    XUngrabServer(display);
    XCloseDisplay( display );
    return 0;
}
