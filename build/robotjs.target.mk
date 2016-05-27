# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := robotjs
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=robotjs' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-Wall \
	-Wparentheses \
	-Winline \
	-Wbad-function-cast \
	-Wdisabled-optimization \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Debug := \
	-I/home/kbelaid/.node-gyp/4.1.1/include/node \
	-I/home/kbelaid/.node-gyp/4.1.1/src \
	-I/home/kbelaid/.node-gyp/4.1.1/deps/uv/include \
	-I/home/kbelaid/.node-gyp/4.1.1/deps/v8/include \
	-I$(srcdir)/node_modules/nan

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=robotjs' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-Wall \
	-Wparentheses \
	-Winline \
	-Wbad-function-cast \
	-Wdisabled-optimization \
	-O3 \
	-ffunction-sections \
	-fdata-sections \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Release := \
	-I/home/kbelaid/.node-gyp/4.1.1/include/node \
	-I/home/kbelaid/.node-gyp/4.1.1/src \
	-I/home/kbelaid/.node-gyp/4.1.1/deps/uv/include \
	-I/home/kbelaid/.node-gyp/4.1.1/deps/v8/include \
	-I$(srcdir)/node_modules/nan

OBJS := \
	$(obj).target/$(TARGET)/src/robotjs.o \
	$(obj).target/$(TARGET)/src/deadbeef_rand.o \
	$(obj).target/$(TARGET)/src/mouse.o \
	$(obj).target/$(TARGET)/src/keypress.o \
	$(obj).target/$(TARGET)/src/keycode.o \
	$(obj).target/$(TARGET)/src/screen.o \
	$(obj).target/$(TARGET)/src/screengrab.o \
	$(obj).target/$(TARGET)/src/snprintf.o \
	$(obj).target/$(TARGET)/src/MMBitmap.o \
	$(obj).target/$(TARGET)/src/xdisplay.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS := \
	-lpng \
	-lz \
	-lX11 \
	-lXtst

$(obj).target/robotjs.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/robotjs.node: LIBS := $(LIBS)
$(obj).target/robotjs.node: TOOLSET := $(TOOLSET)
$(obj).target/robotjs.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/robotjs.node
# Add target alias
.PHONY: robotjs
robotjs: $(builddir)/robotjs.node

# Copy this to the executable output path.
$(builddir)/robotjs.node: TOOLSET := $(TOOLSET)
$(builddir)/robotjs.node: $(obj).target/robotjs.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/robotjs.node
# Short alias for building this executable.
.PHONY: robotjs.node
robotjs.node: $(obj).target/robotjs.node $(builddir)/robotjs.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/robotjs.node

