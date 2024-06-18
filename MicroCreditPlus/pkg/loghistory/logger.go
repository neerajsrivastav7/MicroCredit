package loghistory

import (
    "fmt"
    "io"
    "log"
    "os"
    "sync"
)

type Logger struct {
    mu    sync.Mutex
    level LogLevel
    out   io.Writer
    log   *log.Logger
}

type LogLevel int

const (
    DEBUG LogLevel = iota
    INFO
    WARN
    ERROR
)

var levelNames = []string{
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
}

func New(out io.Writer, level LogLevel) *Logger {
    if out == nil {
        out = os.Stdout
    }
    return &Logger{
        level: level,
        out:   out,
        log:   log.New(out, "", log.LstdFlags),
    }
}

func (l *Logger) logf(level LogLevel, format string, v ...interface{}) {
    if level < l.level {
        return
    }
    l.mu.Lock()
    defer l.mu.Unlock()
    prefix := fmt.Sprintf("[%s] ", levelNames[level])
    l.log.SetPrefix(prefix)
    l.log.Printf(format, v...)
}

func (l *Logger) Debug(format string, v ...interface{}) {
    l.logf(DEBUG, format, v...)
}

func (l *Logger) Info(format string, v ...interface{}) {
    l.logf(INFO, format, v...)
}

func (l *Logger) Warn(format string, v ...interface{}) {
    l.logf(WARN, format, v...)
}

func (l *Logger) Error(format string, v ...interface{}) {
    l.logf(ERROR, format, v...)
}
