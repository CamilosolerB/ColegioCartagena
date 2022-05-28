use colegio;
select * from docente inner join `materias-profesor` on (Codigoprofesor=idprofmat) inner join materias on (idmatprof=Idmateria) Where idcursmat=1001