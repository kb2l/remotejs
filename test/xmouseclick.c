#include <X11/Xlib.h>
#include <stdio.h>
#include <stdlib.h>

int main()
{
  Display* display;
  int screen_num;
  Screen *screen;
  Window root_win;
  XEvent report;
  XButtonEvent *xb = (XButtonEvent *)&report;
  int i;
  display = XOpenDisplay(0);
  if (display == NULL)
  {
      perror("Cannot connect to X server");
      exit (-1);
  }

  screen_num = DefaultScreen(display);
  screen = XScreenOfDisplay(display, screen_num);
  root_win = RootWindow(display, XScreenNumberOfScreen(screen));
  i = XGrabPointer(display, root_win, False,
              ButtonReleaseMask | ButtonPressMask | Button1MotionMask, GrabModeSync,
              GrabModeAsync, root_win, None, CurrentTime);
  if(i != GrabSuccess)
  {
      perror("Can't grab the mouse");
      exit(-1);
  }

  XAllowEvents(display, SyncPointer, CurrentTime);
  XWindowEvent(display, root_win, ButtonPressMask | ButtonReleaseMask, &report);
  switch(report.type)
  {
    case ButtonPress:
       switch(report.xbutton.button)
       {
         case Button1:
             printf("Press Left @ (%d, %d)\n", xb->x_root, xb->y_root);
             break;
         case Button3:
             printf("Press Right @ (%d, %d)\n", xb->x_root, xb->y_root);
             break;
         default:
             break;
       }
      break;
    case ButtonRelease:
    default:
      break;
  }

  XFlush(display);
  XUngrabServer(display);
  XCloseDisplay( display );
}
