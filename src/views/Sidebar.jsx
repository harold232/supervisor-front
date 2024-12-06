import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Button, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, School, Book, CalendarToday, Assessment, People, Menu } from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const modules = [
    { text: 'User', icon: <People />, path: '/user' },
    { text: 'Overview', icon: <Home />, path: '/overview' },
    { text: 'Institución Educativa', icon: <School />, path: '/institucion-educativa' },
    { text: 'Plan de Estudios', icon: <Book />, path: '/plan-de-estudios' },
    { text: 'Ciclo Académico', icon: <CalendarToday />, path: '/ciclo-academico' },
    { text: 'Competencias', icon: <Assessment />, path: '/' },
    { text: 'Docentes', icon: <People />, path: '/docentes' },
  ];

  return (
    <>
      <IconButton
        onClick={toogleSidebar}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300, color: '#0004'  }}
      >
        <Menu />
      </IconButton>

      <Drawer
        variant="permanent"
        anchor="left"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 337 : 0,
          transition: 'width 0.3s ease',
          bgcolor: '#F5F5F5',
          borderRadius: '15px',
          m: '7px',
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? 337 : 0,
            transition: 'width 0.3s ease',
            borderRadius: '15px',
            backgroundColor: '#e3e4e6'
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            p: 5
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '27.46px',
            }}
          >
            {modules.map((module, index) => (
              <ListItem
                key={index}
                selected={location.pathname === module.path}
                onClick={() => navigate(module.path)}
                sx={{
                  p: '14.58px 30px',
                  bgcolor: location.pathname === module.path ? '#D1C5CD' : 'transparent',
                  borderRadius: '40px',
                  '&:hover': {
                    bgcolor: '#D1C5CD',
                    padding: '14.58px 30px',
                    borderRadius: '40px', 
                  },
                  '& .MuiListItemIcon-root': {
                    color: location.pathname === module.path ? '#AE675B' : '#A01C21',
                  },
                }}
              >
                <ListItemIcon >{module.icon}</ListItemIcon>
                <ListItemText primary={module.text} />
              </ListItem>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{ p: '19px 55px 18.22px 55px', mt: 2, backgroundColor: '#71384D', borderRadius: 20, '&:hover': { backgroundColor: '#D1C5CD' } }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;